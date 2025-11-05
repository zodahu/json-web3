const fs = require('fs');

const mainnetTokens = `  // Mainnet Tokens
  "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9": { decimals: 18, symbol: "AAVE", chain: "mainnet" },
  "0x44108f0223a3c3028f5fe7aec7f9bb2e66bef82f": { decimals: 18, symbol: "ACX", chain: "mainnet" },
  "0x3106a0a076bedae847652f42ef07fd58589e001f": { decimals: 18, symbol: "ADS", chain: "mainnet" },
  "0xb528edbef013aff855ac3c50b381f253af13b997": { decimals: 18, symbol: "AEVO", chain: "mainnet" },
  "0x8668a15b7b023dc77b372a740fcb8939e15257cf": { decimals: 18, symbol: "AfCVX", chain: "mainnet" },
  "0x0000000016e6cb3038203c1129c8b4aee7af7a11": { decimals: 18, symbol: "AfETH", chain: "mainnet" },
  "0xe1b4d34e8754600962cd944b535180bd758e6c2e": { decimals: 18, symbol: "AgETH", chain: "mainnet" },
  "0x7da2641000cbb407c329310c461b2cb9c70c3046": { decimals: 18, symbol: "AGI", chain: "mainnet" },
  "0x5b7533812759b45c2b44c19e320ba2cd2681b542": { decimals: 8, symbol: "AGIX", chain: "mainnet" },
  "0x626e8036deb333b408be468f951bdb42433cbf18": { decimals: 18, symbol: "AIOZ", chain: "mainnet" },
  "0x8afe4055ebc86bd2afb3940c0095c9aca511d852": { decimals: 18, symbol: "AIUS", chain: "mainnet" },
  "0xd5255cc08ebaf6d54ac9448822a18d8a3da29a42": { decimals: 6, symbol: "AIDaUSDC", chain: "mainnet" },
  "0x2b95a1dcc3d405535f9ed33c219ab38e8d7e0884": { decimals: 18, symbol: "AladdinCRV", chain: "mainnet" },
  "0xb0903ab70a7467ee5756074b31ac88aebb8fb777": { decimals: 18, symbol: "AladdinCVX", chain: "mainnet" },
  "0xdbdb4d16eda451d0503b854cf79d55697f90c8df": { decimals: 18, symbol: "ALCX", chain: "mainnet" },
  "0xb26c4b3ca601136daf98593feaeff9e0ca702a8d": { decimals: 18, symbol: "ALD", chain: "mainnet" },
  "0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6": { decimals: 18, symbol: "AlETH", chain: "mainnet" },
  "0x9eead9ce15383caeed975427340b3a369410cfbf": { decimals: 6, symbol: "AlloyUSDT", chain: "mainnet" },
  "0x8457ca5040ad67fdebbcc8edce889a335bc0fbfb": { decimals: 18, symbol: "ALT", chain: "mainnet" },
  "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9": { decimals: 18, symbol: "AlUSD", chain: "mainnet" },
  "0xff20817765cb7f73d4bde2e66e067e58d11095c2": { decimals: 18, symbol: "AMP", chain: "mainnet" },
  "0x5fd13359ba15a84b76f7f87568309040176167cd": { decimals: 18, symbol: "AmphrETH", chain: "mainnet" },
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161": { decimals: 9, symbol: "AMPL", chain: "mainnet" },
  "0x31429d1856ad1377a8a0079410b297e1a9e214c2": { decimals: 18, symbol: "ANGLE", chain: "mainnet" },
  "0x8290333cef9e6d528dd5618fb97a76f268f3edd4": { decimals: 18, symbol: "ANKR", chain: "mainnet" },
  "0xe95a203b1a91a908f9b9ce46459d101078c2c3cb": { decimals: 18, symbol: "AnkrETH", chain: "mainnet" },
  "0x4d224452801aced8b2f0aebe155379bb5d594381": { decimals: 18, symbol: "APE", chain: "mainnet" },
  "0x26ea1f595f6567b7050fbba24f6a66e19db4d560": { decimals: 18, symbol: "APEPunk", chain: "mainnet" },
  "0xaaaaaaabc6cbc3a1fd3a0fe0fdec43251c6562f5": { decimals: 18, symbol: "APETH", chain: "mainnet" },
  "0xff709449528b6fb6b88f557f7d93dece33bca78d": { decimals: 18, symbol: "ApeUSD", chain: "mainnet" },
  "0x594daad7d77592a2b97b725a7ad59d7e188b5bfa": { decimals: 18, symbol: "APU", chain: "mainnet" },
  "0x4104b135dbc9609fc1a9490e61369036497660c8": { decimals: 18, symbol: "APW", chain: "mainnet" },
  "0x9ba021b0a9b958b5e75ce9f6dff97c7ee52cb3e6": { decimals: 18, symbol: "ApxETH", chain: "mainnet" },
  "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1": { decimals: 18, symbol: "ARB", chain: "mainnet" },
  "0x73c69d24ad28e2d43d03cbf35f79fe26ebde1011": { decimals: 18, symbol: "ARCH", chain: "mainnet" },
  "0x6e2a43be0b1d33b726f0ca3b8de60b3482b8b050": { decimals: 18, symbol: "ARKM", chain: "mainnet" },
  "0x0943d06a5ff3b25ddc51642717680c105ad63c01": { decimals: 18, symbol: "Ascend", chain: "mainnet" },
  "0x59a529070fbb61e6d6c91f952ccb7f35c34cf8aa": { decimals: 18, symbol: "ASF", chain: "mainnet" },
  "0x440017a1b021006d556d7fc06a54c32e42eb745b": { decimals: 18, symbol: "AtG", chain: "mainnet" },
  "0xc0c293ce456ff0ed870add98a0828dd4d2903dbf": { decimals: 18, symbol: "AURA", chain: "mainnet" },
  "0x616e8bfa43f920657b3497dbf40d6b1a02d4608d": { decimals: 18, symbol: "AuraBAL", chain: "mainnet" },
  "0x00000000efe302beaa2b3e6e1b18d08d69a9012a": { decimals: 6, symbol: "AUSD", chain: "mainnet" },`;

const baseTokens = `  // Base Chain Tokens
  "0x6921b130d297cc43754afba22e5eac0fbf8db75b": { decimals: 18, symbol: "Doginme", chain: "base" },
  "0x1bc0c42215582d5a085795f4badba3c36d1bcb": { decimals: 18, symbol: "CLANKER", chain: "base" },
  "0x63706e401c06ac8513145b7687a14804d17f814b": { decimals: 18, symbol: "AAVE", chain: "base" },
  "0x940181a94a35a4569e4529a3cdfb74e38fd98631": { decimals: 18, symbol: "AERO", chain: "base" },
  "0xfad8cb754230dbfd249db0e8eccb5142dd675a0d": { decimals: 18, symbol: "AEROBUD", chain: "base" },`;

console.log("Starting token generation...");
console.log("This is a test - file generation is TOO LARGE for direct writing");
console.log("Total mainnet tokens to process: ~900");
console.log("Total base tokens to process: ~200");

