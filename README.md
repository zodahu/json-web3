# JSON-Decimal

Convert Ethereum token amounts from Wei to human-readable decimals in JSON data.

**Live Demo**: [https://zodahu.github.io/json-decimal/](https://zodahu.github.io/json-decimal/)

## Features

- ⚡ Real-time Wei to decimal conversion with token symbols
- 🎯 Customizable field mappings for token addresses and amounts
- 🔧 Configurable token decimal settings
- 📝 Monaco Editor with syntax highlighting
- 🌳 Handles nested JSON structures
- 💾 Persistent configuration

## Tech Stack

React · TypeScript · Monaco Editor · Ethers.js · Vite

## Installation

```bash
git clone https://github.com/zodahu/json-decimal.git
cd json-decimal
npm install
npm run dev
```

## Usage

### Input Example

```json
{
  "sellToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "buyToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "sellAmount": "1000000000",
  "buyAmount": "500000000000000000"
}
```

### Output

```json
{
  "sellToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "buyToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "sellAmount": "1000.00 USDC",
  "buyAmount": "0.50 ETH"
}
```

## Supported Tokens

Pre-configured with common tokens:
- ETH (18 decimals)
- USDC (6 decimals)
- USDT (6 decimals)
- DAI (18 decimals)
- WETH (18 decimals)

Add custom tokens via the Settings panel.

## Deployment

```bash
# Deploy to GitHub Pages
npm run deploy

# Remove deployment
git push origin --delete gh-pages
```

## License

MIT License
