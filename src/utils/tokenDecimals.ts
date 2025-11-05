// Ethereum token decimals mapping
export interface TokenInfo {
  decimals: number;
  symbol: string;
  chain: "mainnet" | "base";
}

export const defaultTokenDecimals: Record<string, TokenInfo> = {
  // Empty - all tokens will be fetched via RPC
};

// 保存當前的 tokenDecimals 對象
let tokenDecimals: Record<string, TokenInfo> = { ...defaultTokenDecimals };

// Runtime cache for tokens fetched from RPC
const runtimeTokenCache: Record<string, TokenInfo> = {};

// 更新 tokenDecimals 對象
export const updateTokenDecimals = (
  newTokenDecimals: Record<string, TokenInfo>
): void => {
  // 創建一個新的對象，將所有地址轉為小寫
  const normalizedTokenDecimals: Record<string, TokenInfo> = {};

  for (const [address, info] of Object.entries(newTokenDecimals)) {
    normalizedTokenDecimals[address.toLowerCase()] = info;
  }

  tokenDecimals = normalizedTokenDecimals;
};

// 獲取當前的 tokenDecimals 對象
export const getTokenDecimalsList = (): Record<string, TokenInfo> => {
  return { ...tokenDecimals };
};

// 獲取 token 的小數位數 (異步版本，支援 RPC 查詢)
export const getTokenDecimals = async (
  tokenAddress: string
): Promise<number | null> => {
  if (!tokenAddress) return null;

  // 將地址轉為小寫以便比較
  const normalizedAddress = tokenAddress.toLowerCase();

  // 1. 先查找白名單
  if (tokenDecimals[normalizedAddress]?.decimals !== undefined) {
    return tokenDecimals[normalizedAddress].decimals;
  }

  // 2. 查找執行期快取
  if (runtimeTokenCache[normalizedAddress]?.decimals !== undefined) {
    return runtimeTokenCache[normalizedAddress].decimals;
  }

  // 3. 通過 RPC 獲取
  try {
    const { fetchTokenDecimals } = await import("./rpcClient");
    const result = await fetchTokenDecimals(normalizedAddress);

    if (result !== null) {
      // 1. 存入執行期快取
      runtimeTokenCache[normalizedAddress] = {
        decimals: result.decimals,
        symbol: "",
        chain: result.chain,
      };

      // 2. 新增到 tokenDecimals（這樣會在設定列表中顯示）
      tokenDecimals[normalizedAddress] = {
        decimals: result.decimals,
        symbol: "",
        chain: result.chain,
      };

      return result.decimals;
    }
  } catch (error) {
    console.error("Failed to fetch token decimals from RPC:", error);
  }

  // 4. 找不到時返回 null，讓用戶看出有東西沒找到
  console.warn(`No decimals found for token: ${normalizedAddress}`);
  return null;
};

// 獲取 token 的 symbol
export const getTokenSymbol = (tokenAddress: string): string => {
  if (!tokenAddress) return "";

  // 將地址轉為小寫以便比較
  const normalizedAddress = tokenAddress.toLowerCase();

  // 先查找白名單
  if (tokenDecimals[normalizedAddress]?.symbol) {
    return tokenDecimals[normalizedAddress].symbol;
  }

  // 查找執行期快取
  if (runtimeTokenCache[normalizedAddress]?.symbol) {
    return runtimeTokenCache[normalizedAddress].symbol;
  }

  return "";
};

// 批量獲取 token 信息
export const batchGetTokenInfo = async (
  tokenAddresses: string[]
): Promise<Map<string, TokenInfo>> => {
  const results = new Map<string, TokenInfo>();
  const addressesToFetch: string[] = [];

  // 先檢查白名單和快取
  for (const address of tokenAddresses) {
    if (!address) continue;

    const normalizedAddress = address.toLowerCase();

    // 1. 檢查白名單
    if (tokenDecimals[normalizedAddress]) {
      results.set(normalizedAddress, tokenDecimals[normalizedAddress]);
      continue;
    }

    // 2. 檢查執行期快取
    if (runtimeTokenCache[normalizedAddress]) {
      results.set(normalizedAddress, runtimeTokenCache[normalizedAddress]);
      continue;
    }

    // 需要從 RPC 獲取
    addressesToFetch.push(normalizedAddress);
  }

  // 如果有需要獲取的地址，批量查詢
  if (addressesToFetch.length > 0) {
    try {
      const { batchFetchTokenDecimalsWithFallback } = await import(
        "./rpcClient"
      );
      const rpcResults = await batchFetchTokenDecimalsWithFallback(
        addressesToFetch
      );

      rpcResults.forEach((info, address) => {
        const tokenInfo: TokenInfo = {
          decimals: info.decimals,
          symbol: info.symbol || "",
          chain: info.chain,
        };

        // 1. 存入執行期快取
        runtimeTokenCache[address] = tokenInfo;

        // 2. 新增到 tokenDecimals（這樣會在設定列表中顯示）
        tokenDecimals[address] = tokenInfo;

        results.set(address, tokenInfo);
      });

      // 對於查詢失敗的地址，不使用預設值，讓用戶看出有東西沒找到
      const failedAddresses = addressesToFetch.filter(
        (address) => !results.has(address)
      );
      if (failedAddresses.length > 0) {
        console.warn("Failed to fetch decimals for tokens:", failedAddresses);
      }
    } catch (error) {
      console.error("Failed to batch fetch token info:", error);
    }
  }

  return results;
};

// 獲取 token 的完整信息（單個查詢，保留向後兼容）
export const getTokenInfo = async (
  tokenAddress: string
): Promise<TokenInfo | null> => {
  if (!tokenAddress) {
    return null;
  }

  const results = await batchGetTokenInfo([tokenAddress]);
  return results.get(tokenAddress.toLowerCase()) || null;
};

// 獲取按鏈篩選的 tokens
export const getTokensByChain = (
  chain: "mainnet" | "base"
): Record<string, TokenInfo> => {
  const filtered: Record<string, TokenInfo> = {};

  for (const [address, info] of Object.entries(tokenDecimals)) {
    if (info.chain === chain) {
      filtered[address] = info;
    }
  }

  return filtered;
};

// 將 Wei 轉換為小數單位
export const weiToDecimal = (amount: string, decimals: number): string => {
  try {
    if (!amount) return "0";

    // 處理科學記數法
    const amountStr = amount.toString();
    if (amountStr.includes("e")) {
      const parts = amountStr.split("e");
      const base = parseFloat(parts[0]);
      const exponent = parseInt(parts[1]);

      if (exponent > 0) {
        return (base * Math.pow(10, exponent)).toString();
      } else {
        // 處理非常小的數字
        return base.toFixed(Math.abs(exponent) + 6);
      }
    }

    // 正常處理
    if (amountStr === "0") return "0";

    // 將數字字符串轉為 BigInt
    const amountBigInt = BigInt(amountStr);
    const divisor = BigInt(10) ** BigInt(decimals);

    // 計算整數部分
    const integerPart = amountBigInt / divisor;

    // 計算小數部分
    const remainder = amountBigInt % divisor;
    let fractionalPart = remainder.toString().padStart(decimals, "0");

    // 移除尾部的 0
    while (fractionalPart.endsWith("0") && fractionalPart.length > 1) {
      fractionalPart = fractionalPart.slice(0, -1);
    }

    if (fractionalPart === "0") {
      return integerPart.toString();
    }

    return `${integerPart}.${fractionalPart}`;
  } catch (error) {
    console.error("Error converting Wei to decimal:", error);
    return amount;
  }
};
