// RPC client for fetching token decimals from blockchain
export type Chain = "mainnet" | "base";

const RPC_ENDPOINTS: Record<Chain, string> = {
  mainnet: "https://eth-mainnet.public.blastapi.io",
  base: "https://base-mainnet.public.blastapi.io",
};

// Multicall3 contract address (same on both chains)
const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

// ERC20 decimals() function selector: 0x313ce567
const DECIMALS_FUNCTION_SELECTOR = "0x313ce567";

// ERC20 symbol() function selector: 0x95d89b41
const SYMBOL_FUNCTION_SELECTOR = "0x95d89b41";

// Multicall3 aggregate3 function selector: 0x82ad56cb
const MULTICALL3_AGGREGATE3_SELECTOR = "0x82ad56cb";

// Timeout for RPC requests (in milliseconds)
const RPC_TIMEOUT = 10000;

// Max tokens per batch (Multicall3 can handle more, but we limit for reliability)
const BATCH_SIZE = 500;

interface JsonRpcRequest {
  jsonrpc: string;
  method: string;
  params: unknown[];
  id: number;
}

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: string;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Make an RPC call with timeout
 */
async function makeRpcCall(
  endpoint: string,
  tokenAddress: string
): Promise<string | null> {
  const request: JsonRpcRequest = {
    jsonrpc: "2.0",
    method: "eth_call",
    params: [
      {
        to: tokenAddress,
        data: DECIMALS_FUNCTION_SELECTOR,
      },
      "latest",
    ],
    id: 1,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RPC_TIMEOUT);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `RPC request failed: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data: JsonRpcResponse = await response.json();

    if (data.error) {
      console.error(`RPC error: ${data.error.message}`);
      return null;
    }

    return data.result || null;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("RPC request timed out");
      } else {
        console.error(`RPC request failed: ${error.message}`);
      }
    }
    return null;
  }
}

/**
 * Parse decimals from RPC response
 */
function parseDecimals(hexString: string): number | null {
  try {
    // Remove 0x prefix if present
    const hex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;

    // Parse as integer
    const decimals = parseInt(hex, 16);

    // Validate decimals (should be between 0 and 255 for most tokens)
    if (isNaN(decimals) || decimals < 0 || decimals > 255) {
      return null;
    }

    return decimals;
  } catch (error) {
    console.error("Failed to parse decimals:", error);
    return null;
  }
}

/**
 * Parse symbol from RPC response
 */
function parseSymbol(hexString: string): string {
  try {
    // Remove 0x prefix if present
    let hex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;

    // If the result is empty, return empty string
    if (!hex || hex === "0".repeat(64)) {
      return "";
    }

    // Check if it's a dynamic string (starts with offset pointer)
    if (hex.length > 64) {
      // Skip offset (32 bytes) and read length (32 bytes)
      hex = hex.slice(64);
      const length = parseInt(hex.slice(0, 64), 16);
      // Read actual string data
      hex = hex.slice(64, 64 + length * 2);
    }

    // Convert hex to string
    let symbol = "";
    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.substr(i, 2), 16);
      if (byte === 0) break; // Stop at null terminator
      symbol += String.fromCharCode(byte);
    }

    return symbol;
  } catch (error) {
    console.error("Failed to parse symbol:", error);
    return "";
  }
}

/**
 * Fetch token decimals from a specific chain
 */
export async function fetchTokenDecimalsFromChain(
  tokenAddress: string,
  chain: Chain
): Promise<number | null> {
  const endpoint = RPC_ENDPOINTS[chain];

  // Normalize address to lowercase
  const normalizedAddress = tokenAddress.toLowerCase();

  const result = await makeRpcCall(endpoint, normalizedAddress);

  if (!result) {
    return null;
  }

  return parseDecimals(result);
}

/**
 * Fetch token decimals with fallback logic
 * Try mainnet first, then base
 */
export async function fetchTokenDecimals(
  tokenAddress: string
): Promise<{ decimals: number; chain: Chain } | null> {
  // Try mainnet first
  const mainnetDecimals = await fetchTokenDecimalsFromChain(
    tokenAddress,
    "mainnet"
  );
  if (mainnetDecimals !== null) {
    return { decimals: mainnetDecimals, chain: "mainnet" };
  }

  // Try base if mainnet failed
  const baseDecimals = await fetchTokenDecimalsFromChain(tokenAddress, "base");
  if (baseDecimals !== null) {
    return { decimals: baseDecimals, chain: "base" };
  }

  // Both failed
  return null;
}

/**
 * Encode Multicall3 aggregate3 calldata using ethers.js ABI encoding
 */
function encodeMulticall3Calls(
  calls: Array<{ target: string; callData: string }>
): string {
  // We'll use a simpler approach: manually encode the ABI
  // aggregate3(Call3[] calldata calls)
  // Call3: { address target, bool allowFailure, bytes callData }

  const functionSelector = MULTICALL3_AGGREGATE3_SELECTOR.slice(2); // Remove 0x

  // Offset to the array (always 32 bytes = 0x20)
  let encoded =
    functionSelector +
    "0000000000000000000000000000000000000000000000000000000000000020";

  // Array length
  const arrayLength = calls.length.toString(16).padStart(64, "0");
  encoded += arrayLength;

  // Calculate offsets for each Call3 struct
  let dataOffset = calls.length * 32; // Space for offset pointers
  const encodedStructs: string[] = [];

  for (const call of calls) {
    // Store offset pointer
    encoded += dataOffset.toString(16).padStart(64, "0");

    // Encode the Call3 struct
    const target = call.target
      .toLowerCase()
      .replace("0x", "")
      .padStart(64, "0");
    const allowFailure =
      "0000000000000000000000000000000000000000000000000000000000000001"; // true
    const callDataOffset =
      "0000000000000000000000000000000000000000000000000000000000000060"; // 96 bytes (3 * 32)

    const callDataBytes = call.callData.replace("0x", "");
    const callDataLength = Math.floor(callDataBytes.length / 2)
      .toString(16)
      .padStart(64, "0");

    // Pad callData to 32-byte boundary
    const remainder = callDataBytes.length % 64;
    const paddedCallData =
      remainder === 0
        ? callDataBytes
        : callDataBytes + "0".repeat(64 - remainder);

    const structEncoded =
      target + allowFailure + callDataOffset + callDataLength + paddedCallData;
    encodedStructs.push(structEncoded);

    // Update offset for next struct (use Math.floor to ensure integer)
    dataOffset += Math.floor(structEncoded.length / 2);
  }

  // Append all struct data
  encoded += encodedStructs.join("");

  return "0x" + encoded;
}

/**
 * Decode Multicall3 aggregate3 results
 */
function decodeMulticall3Results(
  hexData: string
): Array<{ success: boolean; returnData: string }> {
  try {
    let data = hexData.startsWith("0x") ? hexData.slice(2) : hexData;

    // Skip offset (32 bytes)
    data = data.slice(64);

    // Read array length
    const arrayLength = parseInt(data.slice(0, 64), 16);
    data = data.slice(64);

    const results: Array<{ success: boolean; returnData: string }> = [];

    // Skip all offset pointers
    data = data.slice(arrayLength * 64);

    // Parse each Result struct
    for (let i = 0; i < arrayLength; i++) {
      // Read success (bool, 32 bytes)
      const success = parseInt(data.slice(0, 64), 16) !== 0;
      data = data.slice(64);

      // Read returnData offset (32 bytes, skip it)
      data = data.slice(64);

      // Read returnData length
      const returnDataLength = parseInt(data.slice(0, 64), 16);
      data = data.slice(64);

      // Read returnData
      const returnData = "0x" + data.slice(0, returnDataLength * 2);
      data = data.slice(returnDataLength * 2);

      // Skip padding to 32-byte boundary
      const padding = returnDataLength % 32;
      if (padding !== 0) {
        data = data.slice((32 - padding) * 2);
      }

      results.push({ success, returnData });
    }

    return results;
  } catch (error) {
    console.error("Failed to decode multicall3 results:", error);
    return [];
  }
}

/**
 * Batch fetch a chunk of tokens using Multicall3
 */
async function fetchTokenChunk(
  tokenAddresses: string[],
  chain: Chain
): Promise<Map<string, { decimals: number; symbol: string }>> {
  const results = new Map<string, { decimals: number; symbol: string }>();
  const endpoint = RPC_ENDPOINTS[chain];

  try {
    // Prepare Multicall3 calls (2 calls per token: decimals + symbol)
    const calls = tokenAddresses.flatMap((address) => [
      { target: address, callData: DECIMALS_FUNCTION_SELECTOR },
      { target: address, callData: SYMBOL_FUNCTION_SELECTOR },
    ]);

    // Encode Multicall3 calldata
    const calldata = encodeMulticall3Calls(calls);

    // Make single eth_call to Multicall3
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RPC_TIMEOUT);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [
          {
            to: MULTICALL3_ADDRESS,
            data: calldata,
          },
          "latest",
        ],
        id: 1,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Multicall3 request failed: ${response.status}`);
      return results;
    }

    const rpcResponse = await response.json();

    if (rpcResponse.error) {
      console.warn(
        `Multicall3 RPC error on ${chain}: ${rpcResponse.error.message}`
      );
      console.warn(`This is normal if tokens don't exist on this chain`);
      return results;
    }

    if (!rpcResponse.result) {
      console.warn(`Multicall3 returned no result on ${chain}`);
      return results;
    }

    // Decode Multicall3 results
    const decodedResults = decodeMulticall3Results(rpcResponse.result);

    // Process results (every 2 results = 1 token)
    for (let i = 0; i < tokenAddresses.length; i++) {
      const decimalsResult = decodedResults[i * 2];
      const symbolResult = decodedResults[i * 2 + 1];

      // Parse decimals (required)
      if (decimalsResult?.success && decimalsResult.returnData) {
        const decimals = parseDecimals(decimalsResult.returnData);

        if (decimals !== null) {
          // Parse symbol (optional)
          const symbol =
            symbolResult?.success && symbolResult.returnData
              ? parseSymbol(symbolResult.returnData)
              : "";

          results.set(tokenAddresses[i], { decimals, symbol });
        }
      }
    }
  } catch (error) {
    console.error(`Multicall3 chunk fetch failed on ${chain}:`, error);
  }

  return results;
}

/**
 * Batch fetch token decimals and symbols with chunking
 */
export async function batchFetchTokenDecimals(
  tokenAddresses: string[],
  chain: Chain
): Promise<Map<string, { decimals: number; symbol: string }>> {
  const results = new Map<string, { decimals: number; symbol: string }>();

  if (tokenAddresses.length === 0) {
    return results;
  }

  // Normalize addresses
  const normalizedAddresses = tokenAddresses.map((addr) => addr.toLowerCase());

  // Split into chunks
  const chunks: string[][] = [];
  for (let i = 0; i < normalizedAddresses.length; i += BATCH_SIZE) {
    chunks.push(normalizedAddresses.slice(i, i + BATCH_SIZE));
  }

  console.log(
    `Fetching ${normalizedAddresses.length} tokens from ${chain} in ${chunks.length} batches (max ${BATCH_SIZE} per batch)...`
  );

  // Process chunks sequentially to avoid overwhelming the RPC
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(
      `Processing batch ${i + 1}/${chunks.length} (${chunk.length} tokens)...`
    );

    const chunkResults = await fetchTokenChunk(chunk, chain);

    // Merge results
    chunkResults.forEach((info, address) => {
      results.set(address, info);
    });
  }

  console.log(
    `Batch fetch on ${chain}: queried ${tokenAddresses.length} tokens, got ${results.size} results`
  );

  return results;
}

/**
 * Batch fetch token decimals and symbols with fallback between chains
 */
export async function batchFetchTokenDecimalsWithFallback(
  tokenAddresses: string[]
): Promise<Map<string, { decimals: number; symbol: string; chain: Chain }>> {
  const results = new Map<
    string,
    { decimals: number; symbol: string; chain: Chain }
  >();

  if (tokenAddresses.length === 0) {
    return results;
  }

  // Normalize addresses
  const normalizedAddresses = tokenAddresses.map((addr) => addr.toLowerCase());

  // Try mainnet first
  console.log(
    `Trying to fetch ${normalizedAddresses.length} tokens from mainnet...`
  );
  const mainnetResults = await batchFetchTokenDecimals(
    normalizedAddresses,
    "mainnet"
  );

  mainnetResults.forEach((info, address) => {
    results.set(address, {
      decimals: info.decimals,
      symbol: info.symbol,
      chain: "mainnet",
    });
  });

  // Find addresses that failed on mainnet
  const failedAddresses = normalizedAddresses.filter(
    (addr) => !results.has(addr)
  );

  // Try base for failed addresses
  if (failedAddresses.length > 0) {
    console.log(
      `${failedAddresses.length} tokens not found on mainnet, trying base...`
    );
    const baseResults = await batchFetchTokenDecimals(failedAddresses, "base");

    baseResults.forEach((info, address) => {
      results.set(address, {
        decimals: info.decimals,
        symbol: info.symbol,
        chain: "base",
      });
    });
  }

  // Log final results
  console.log(
    `Successfully fetched ${results.size}/${normalizedAddresses.length} tokens`
  );

  return results;
}
