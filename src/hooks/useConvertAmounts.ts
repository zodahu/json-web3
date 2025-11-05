import { useCallback, useState } from 'react';

import {
  batchGetTokenInfo,
  weiToDecimal,
} from '../utils/tokenDecimals';

import type { TokenInfo } from '../utils/tokenDecimals';

export interface TokenMapping {
  tokenKey: string;
  amountKeys: string[];
}

/**
 * 用於處理 JSON 中 Wei 數值的轉換
 *
 * @example
 * 輸入 JSON:
 * {
 *   "tokenIn": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
 *   "amountIn": "1000000000",
 *   "tokenOut": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
 *   "amountOut": "5000000",
 *   "nested": {
 *     "tokenIn": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
 *     "amountIn": "500000000"
 *   }
 * }
 *
 * 輸出 JSON:
 * {
 *   "tokenIn": "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
 *   "amountIn": "1000 USDT",
 *   "tokenOut": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
 *   "amountOut": "0.05 WBTC",
 *   "nested": {
 *     "tokenIn": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
 *     "amountIn": "500 USDC"
 *   }
 * }
 */
export const useConvertAmounts = (initialMappings: TokenMapping[] = []) => {
  const [mappings, setMappings] = useState<TokenMapping[]>(initialMappings);
  const [convertedJson, setConvertedJson] = useState<Record<
    string,
    unknown
  > | null>(null);

  /**
   * 更新映射關係
   */
  const updateMappings = useCallback((newMappings: TokenMapping[]) => {
    setMappings(newMappings);
  }, []);

  // 收集所有代幣地址（第一階段：僅收集地址）
  const collectTokenAddresses = useCallback(
    (
      obj: Record<string, unknown> | unknown[] | null,
      addresses: Set<string> = new Set()
    ): Set<string> => {
      if (!obj || typeof obj !== "object") return addresses;

      // 檢查是否有代幣地址鍵
      for (const mapping of mappings) {
        const tokenKey = mapping.tokenKey;

        if (
          !Array.isArray(obj) &&
          tokenKey in obj &&
          typeof obj[tokenKey] === "string"
        ) {
          const tokenAddress = (obj[tokenKey] as string).toLowerCase();
          addresses.add(tokenAddress);
        }
      }

      // 遞迴處理數組
      if (Array.isArray(obj)) {
        for (const item of obj) {
          if (item && typeof item === "object") {
            collectTokenAddresses(item as Record<string, unknown>, addresses);
          }
        }
      }
      // 遞迴處理對象
      else {
        for (const key of Object.keys(obj)) {
          if (obj[key] && typeof obj[key] === "object") {
            collectTokenAddresses(obj[key] as Record<string, unknown>, addresses);
          }
        }
      }

      return addresses;
    },
    [mappings]
  );

  // 收集所有代幣地址及對應的解析信息（異步版本，使用批量查詢）
  const collectTokenInfo = useCallback(
    async (
      obj: Record<string, unknown> | unknown[] | null,
      path: string = "",
      info: Record<
        string,
        { address: string; decimals: number; symbol: string }
      > = {},
      tokenInfoMap?: Map<string, TokenInfo>
    ): Promise<Record<string, { address: string; decimals: number; symbol: string }>> => {
      if (!obj || typeof obj !== "object") return info;

      // 檢查是否有代幣地址鍵
      for (const mapping of mappings) {
        const tokenKey = mapping.tokenKey;

        if (
          !Array.isArray(obj) &&
          tokenKey in obj &&
          typeof obj[tokenKey] === "string"
        ) {
          const tokenAddress = (obj[tokenKey] as string).toLowerCase();
          const currentPath = path ? `${path}.${tokenKey}` : tokenKey;

          // 從批量查詢結果中獲取 token 信息
          const tokenInfo = tokenInfoMap?.get(tokenAddress);
          if (tokenInfo) {
            info[currentPath] = {
              address: tokenAddress,
              decimals: tokenInfo.decimals,
              symbol: tokenInfo.symbol,
            };
          }
        }
      }

      // 遞迴處理數組
      if (Array.isArray(obj)) {
        for (let index = 0; index < obj.length; index++) {
          const item = obj[index];
          if (item && typeof item === "object") {
            await collectTokenInfo(
              item as Record<string, unknown>,
              path ? `${path}[${index}]` : `[${index}]`,
              info,
              tokenInfoMap
            );
          }
        }
      }
      // 遞迴處理對象
      else {
        const keys = Object.keys(obj);
        for (const key of keys) {
          if (obj[key] && typeof obj[key] === "object") {
            await collectTokenInfo(
              obj[key] as Record<string, unknown>,
              path ? `${path}.${key}` : key,
              info,
              tokenInfoMap
            );
          }
        }
      }

      return info;
    },
    [mappings]
  );

  // 使用收集到的代幣信息處理所有金額（異步版本）
  const processWithTokenInfo = useCallback(
    async (
      obj: Record<string, unknown> | unknown[] | null,
      tokenInfo: Record<
        string,
        { address: string; decimals: number; symbol: string }
      >,
      tokenInfoMap?: Map<string, TokenInfo>,
      path: string = ""
    ): Promise<void> => {
      if (!obj || typeof obj !== "object") return;

      // 處理每個可能的金額鍵
      for (const mapping of mappings) {
        const tokenKey = mapping.tokenKey;
        const amountKeys = mapping.amountKeys;

        // 檢查這個對象的路徑是否有關聯的代幣信息
        const relevantTokenKeys: string[] = [];

        // 1. 檢查當前對象是否有代幣鍵
        const currentTokenPath = path ? `${path}.${tokenKey}` : tokenKey;
        if (tokenInfo[currentTokenPath]) {
          relevantTokenKeys.push(currentTokenPath);
        }

        // 2. 檢查父層級是否有代幣鍵 (向上查找最近的代幣信息)
        if (relevantTokenKeys.length === 0) {
          const pathParts = path.split(".");
          while (pathParts.length > 0) {
            const parentPath = pathParts.join(".");
            const parentTokenPath = parentPath
              ? `${parentPath}.${tokenKey}`
              : tokenKey;

            if (tokenInfo[parentTokenPath]) {
              relevantTokenKeys.push(parentTokenPath);
              break;
            }

            pathParts.pop();
          }
        }

        // 3. 檢查這個對象內部是否有 sellToken 或 buyToken
        if (
          !Array.isArray(obj) &&
          "sellToken" in obj &&
          tokenKey === "sellToken" &&
          typeof obj.sellToken === "string"
        ) {
          const tokenAddress = obj.sellToken.toLowerCase();
          const tokenInfoData = tokenInfoMap?.get(tokenAddress) || { decimals: 18, symbol: "", chain: "mainnet" };
          const currentTokenInfo = {
            address: tokenAddress,
            decimals: tokenInfoData.decimals,
            symbol: tokenInfoData.symbol,
          };

          // 為 sellToken 添加 symbol (只在還沒有添加時)
          if (currentTokenInfo.symbol && typeof obj.sellToken === 'string' && !obj.sellToken.includes('(')) {
            obj.sellToken = `${obj.sellToken} (${currentTokenInfo.symbol})`;
          }

          // 處理該對象內的 sellAmount
          for (const amountKey of amountKeys) {
            if (amountKey in obj && typeof obj[amountKey] === "string") {
              const convertedAmount = weiToDecimal(
                obj[amountKey] as string,
                currentTokenInfo.decimals
              );
              obj[amountKey] = currentTokenInfo.symbol
                ? `${convertedAmount} (${currentTokenInfo.symbol})`
                : `${convertedAmount}`;
            }
          }
        } else if (
          !Array.isArray(obj) &&
          "buyToken" in obj &&
          tokenKey === "buyToken" &&
          typeof obj.buyToken === "string"
        ) {
          const tokenAddress = obj.buyToken.toLowerCase();
          const tokenInfoData = tokenInfoMap?.get(tokenAddress) || { decimals: 18, symbol: "", chain: "mainnet" };
          const currentTokenInfo = {
            address: tokenAddress,
            decimals: tokenInfoData.decimals,
            symbol: tokenInfoData.symbol,
          };

          // 為 buyToken 添加 symbol (只在還沒有添加時)
          if (currentTokenInfo.symbol && typeof obj.buyToken === 'string' && !obj.buyToken.includes('(')) {
            obj.buyToken = `${obj.buyToken} (${currentTokenInfo.symbol})`;
          }

          // 處理該對象內的 buyAmount
          for (const amountKey of amountKeys) {
            if (amountKey in obj && typeof obj[amountKey] === "string") {
              const convertedAmount = weiToDecimal(
                obj[amountKey] as string,
                currentTokenInfo.decimals
              );
              obj[amountKey] = currentTokenInfo.symbol
                ? `${convertedAmount} (${currentTokenInfo.symbol})`
                : `${convertedAmount}`;
            }
          }
        }

        // 4. 處理 quote 和其他嵌套對象中的金額
        else if (relevantTokenKeys.length > 0) {
          const tokenPath = relevantTokenKeys[0]; // 使用找到的最匹配的代幣信息
          const { decimals, symbol } = tokenInfo[tokenPath];

          if (!Array.isArray(obj)) {
            // 為 tokenKey 添加 symbol (只在還沒有添加時)
            if (tokenKey in obj && typeof obj[tokenKey] === "string" && symbol) {
              const tokenValue = obj[tokenKey] as string;
              if (!tokenValue.includes('(')) {
                obj[tokenKey] = `${tokenValue} (${symbol})`;
              }
            }

            // 處理金額鍵
            for (const amountKey of amountKeys) {
              if (amountKey in obj && typeof obj[amountKey] === "string") {
                const convertedAmount = weiToDecimal(
                  obj[amountKey] as string,
                  decimals
                );
                obj[amountKey] = symbol
                  ? `${convertedAmount} (${symbol})`
                  : `${convertedAmount}`;
              }
            }
          }
        }
      }

      // 遞迴處理數組
      if (Array.isArray(obj)) {
        for (let index = 0; index < obj.length; index++) {
          const item = obj[index];
          if (item && typeof item === "object") {
            await processWithTokenInfo(
              item as Record<string, unknown>,
              tokenInfo,
              tokenInfoMap,
              path ? `${path}[${index}]` : `[${index}]`
            );
          }
        }
      }
      // 遞迴處理對象
      else {
        // 特殊處理 Uniswap X order 的 cosignerData
        if (!Array.isArray(obj) && 'cosignerData' in obj && obj.cosignerData && typeof obj.cosignerData === 'object') {
          const cosignerData = obj.cosignerData as Record<string, unknown>;
          
          // 取得 input.token 的 decimals 來轉換 inputOverride
          if ('input' in obj && obj.input && typeof obj.input === 'object') {
            const input = obj.input as Record<string, unknown>;
            if ('token' in input && typeof input.token === 'string') {
              // 移除可能已經添加的 symbol (例如 "0x... (SYMBOL)")
              const tokenAddress = input.token.toLowerCase().split(' ')[0];
              const tokenInfoData = tokenInfoMap?.get(tokenAddress);
              
              // 轉換 inputOverride
              if (tokenInfoData && 'inputOverride' in cosignerData && typeof cosignerData.inputOverride === 'string') {
                const convertedAmount = weiToDecimal(cosignerData.inputOverride, tokenInfoData.decimals);
                cosignerData.inputOverride = tokenInfoData.symbol 
                  ? `${convertedAmount} (${tokenInfoData.symbol})`
                  : convertedAmount;
              }
            }
          }
          
          // 取得 outputs 陣列來轉換 outputOverrides
          if ('outputs' in obj && Array.isArray(obj.outputs)) {
            const outputs = obj.outputs as Array<Record<string, unknown>>;
            
            // 轉換 outputOverrides 陣列
            if ('outputOverrides' in cosignerData && Array.isArray(cosignerData.outputOverrides)) {
              const outputOverrides = cosignerData.outputOverrides as Array<unknown>;
              
              for (let i = 0; i < outputOverrides.length; i++) {
                if (typeof outputOverrides[i] === 'string' && outputs[i] && 'token' in outputs[i]) {
                  // 移除可能已經添加的 symbol
                  const tokenAddress = (outputs[i].token as string).toLowerCase().split(' ')[0];
                  const tokenInfoData = tokenInfoMap?.get(tokenAddress);
                  
                  if (tokenInfoData) {
                    const convertedAmount = weiToDecimal(outputOverrides[i] as string, tokenInfoData.decimals);
                    outputOverrides[i] = tokenInfoData.symbol
                      ? `${convertedAmount} (${tokenInfoData.symbol})`
                      : convertedAmount;
                  }
                }
              }
            }
          }
        }
        
        const keys = Object.keys(obj);
        for (const key of keys) {
          if (obj[key] && typeof obj[key] === "object") {
            await processWithTokenInfo(
              obj[key] as Record<string, unknown>,
              tokenInfo,
              tokenInfoMap,
              path ? `${path}.${key}` : key
            );
          }
        }
      }
    },
    [mappings]
  );

  /**
   * 遞迴轉換 JSON 中的金額
   */
  const convertAmounts = useCallback(
    async (json: Record<string, unknown>) => {
      if (!json) return null;

      try {
        // 獲取解析後的 JSON
        const parsedJson = typeof json === "string" ? JSON.parse(json) : json;

        // 深拷貝以避免修改原始數據
        const result = JSON.parse(JSON.stringify(parsedJson));

        // 第一階段：收集所有需要查詢的 token 地址
        const tokenAddresses = collectTokenAddresses(result);
        
        // 第二階段：批量查詢所有 token 信息
        const tokenInfoMap = await batchGetTokenInfo(Array.from(tokenAddresses));

        // 第三階段：使用批量查詢結果構建 tokenInfo 映射
        const tokenInfo = await collectTokenInfo(result, "", {}, tokenInfoMap);

        // 第四階段：使用收集到的代幣信息處理所有金額
        await processWithTokenInfo(result, tokenInfo, tokenInfoMap);

        setConvertedJson(result);
        return result;
      } catch (error) {
        console.error("Error converting amounts:", error);
        return json;
      }
    },
    [mappings, collectTokenAddresses, collectTokenInfo, processWithTokenInfo]
  );

  return {
    convertedJson,
    convertAmounts,
    mappings,
    updateMappings,
  };
};

export default useConvertAmounts;
