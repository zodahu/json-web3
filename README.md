# json-web3

A Web3 JSON viewer that automatically converts Wei amounts to human-readable format with multi-chain token support.

**Live Demo**: [https://zodahu.github.io/json-web3/](https://zodahu.github.io/json-web3/)

## Features

- ⚡ **Real-time Wei Conversion**: Automatically converts Wei amounts to human-readable decimals
- 🔗 **Multi-Chain Support**: Ethereum Mainnet and Base chain tokens
- 🤖 **Auto-Fetch Decimals**: Automatically fetches token decimals via RPC when not in whitelist
- 🎯 **Flexible Mappings**: Customizable field mappings for different JSON structures
- 🦄 **Uniswap X Support**: Special handling for Uniswap X order formats
- 📝 **Monaco Editor**: Syntax highlighting and validation
- 🌳 **Nested Structures**: Handles complex nested JSON objects and arrays
- 💾 **Session Cache**: Runtime caching of fetched token information

## Supported Formats

- **0x Protocol**: `sellToken`, `buyToken`, `sellAmount`, `buyAmount`
- **CoW Protocol**: `sellToken`, `buyToken`, `quote` objects
- **Uniswap X**: `input`, `outputs`, `cosignerData` cross-level references
- **Custom**: Define your own token and amount key mappings

## Tech Stack

React · TypeScript · Monaco Editor · Multicall3 · Vite

## Installation

```bash
git clone https://github.com/zodahu/json-web3.git
cd json-web3
npm install
npm run dev
```

## Usage Example

### Input JSON

```json
{
  "sellToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "buyToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "sellAmount": "1000000000",
  "buyAmount": "196662595169946548"
}
```

### Converted Output

```json
{
  "sellToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 (USDC)",
  "buyToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee (ETH)",
  "sellAmount": "1000 (USDC)",
  "buyAmount": "0.196662595169946548 (ETH)"
}
```

## Pre-configured Tokens

**Mainnet**: USDC, USDT, WBTC, DAI, WETH, and 50+ non-18 decimal tokens  
**Base**: USDC, cbBTC, AERO, BRETT, and more

Tokens not in the whitelist are automatically fetched via public RPC endpoints.

## RPC Integration

Uses Multicall3 batching to efficiently fetch token decimals and symbols from:

- Ethereum Mainnet: `https://eth-mainnet.public.blastapi.io`
- Base: `https://base-mainnet.public.blastapi.io`

## Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

## License

This project is licensed under the **Business Source License 1.1**.

### Usage Terms

- ✅ **Non-Production Use**: Free to use for development, testing, and evaluation
- ❌ **Commercial Use**: Requires a commercial license
- 📅 **Future Open Source**: Will automatically convert to MIT License on **2029-01-01**

### Commercial License

For commercial use or production deployment, please contact: zodahu

### Additional Information

This licensing approach follows the precedent set by major DeFi projects like Uniswap v3 and Aave v3, ensuring the code remains auditable while protecting the creator's commercial interests.

Read the full license terms in the [LICENSE](./LICENSE) file.

---

**Built for Web3 developers and researchers**
