// Ethereum token decimals mapping
export interface TokenInfo {
  decimals: number;
  symbol: string;
  chain: "mainnet" | "base";
}

export const defaultTokenDecimals: Record<string, TokenInfo> = {
  // Base chain tokens - 保留舊有非 18 decimals 的 tokens
  "0x5b7533812759b45c2b44c19e320ba2cd2681b542": { decimals: 8, symbol: "AGIX", chain: "base" },
  "0x9eead9ce15383caeed975427340b3a369410cfbf": {
    decimals: 6,
    symbol: "AlloyUSDT",
    chain: "base",
  },
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161": { decimals: 9, symbol: "AMPL", chain: "base" },
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { decimals: 6, symbol: "USDT", chain: "base" },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { decimals: 6, symbol: "USDC", chain: "base" },
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": { decimals: 8, symbol: "WBTC", chain: "base" },

  // 新增用戶提供的非 18 decimals tokens (Base chain)
  "0x00000000efe302beaa2b3e6e1b18d08d69a9012a": { decimals: 6, symbol: "AUSD", chain: "base" },
  "0x9be89d2a4cd102d8fecc6bf9da793be995c22541": { decimals: 8, symbol: "BBTC", chain: "base" },
  "0x0590cc9232ebf68d81f6707a119898219342ecb9": { decimals: 9, symbol: "BCAT", chain: "base" },
  "0xbea0000029ad1c77d3d5d23ba2d8893db9d1efab": { decimals: 6, symbol: "BEAN", chain: "base" },
  "0x72e4f9f808c49a2a61de9c5896298920dc4eeea9": {
    decimals: 8,
    symbol: "BITCOIN",
    chain: "base",
  },
  "0x8c41455aaa8d6aba3150058d4964349294bf78a3": { decimals: 9, symbol: "BULL", chain: "base" },
  "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf": {
    decimals: 8,
    symbol: "CbBTC",
    chain: "base",
  },
  "0xc581b735a1688071a1746c968e0798d642ede491": { decimals: 6, symbol: "EURT", chain: "base" },
  "0xdb25f211ab05b1c97d595516f45794528a807ad8": { decimals: 2, symbol: "EURS", chain: "base" },
  "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c": { decimals: 6, symbol: "EURC", chain: "base" },
  "0xc96de26018a54d51c097160568752c4e3bd6c364": { decimals: 8, symbol: "FBTC", chain: "base" },
  "0xfd56a3dcfc0690881a466ae432d71bb2db588083": {
    decimals: 6,
    symbol: "FLEET",
    chain: "base",
  },
  "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": {
    decimals: 9,
    symbol: "FLOKI",
    chain: "base",
  },
  "0x465a5a630482f3abd6d3b84b39b29b07214d19e5": {
    decimals: 8,
    symbol: "FUSDC",
    chain: "base",
  },
  "0xd1d2eb1b1e90b638588728b4130137d262c87cae": { decimals: 8, symbol: "GALA", chain: "base" },
  "0xe3c408bd53c31c085a1746af401a4042954ff740": {
    decimals: 8,
    symbol: "GreenMT",
    chain: "base",
  },
  "0x8390a1da07e376ef7add4be859ba74fb83aa02d5": { decimals: 9, symbol: "GROK", chain: "base" },
  "0x393f1d49425d94f47b26e591a9d111df5cd61065": { decimals: 2, symbol: "GUA", chain: "base" },
  "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd": { decimals: 2, symbol: "GUSD", chain: "base" },
  "0x3819f64f282bf135d62168c1e513280daf905e06": { decimals: 9, symbol: "HDRN", chain: "base" },
  "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39": { decimals: 8, symbol: "HEX", chain: "base" },
  "0xb8919522331c59f5c16bdfaa6a121a6e03a91f62": { decimals: 6, symbol: "HOME", chain: "base" },
  "0x20157dbabbe84e3bbfe68c349d0d44e48ae7b5ad2": {
    decimals: 8,
    symbol: "IBTC",
    chain: "base",
  },
  "0xfc4913214444af5c715cc9f7b52655e788a569ed": { decimals: 9, symbol: "ICSA", chain: "base" },
  "0x1fdd61ef9a5c31b9a2abc7d39c139c779e8412af": { decimals: 9, symbol: "JJ", chain: "base" },
  "0xceb67a66c2c8a90980da3a50a3f96c07525a26cb": {
    decimals: 9,
    symbol: "KABOSU",
    chain: "base",
  },
  "0x96543ef8d2c75c26387c1a319ae69c0bee6f3fe7": { decimals: 6, symbol: "KUJI", chain: "base" },
  "0x8236a87084f8b84306f72007f36f2618a5634494": { decimals: 8, symbol: "LBTC", chain: "base" },
  "0x5401b8620e5fb570064ca9114fd1e135fd77d57c": {
    decimals: 8,
    symbol: "LBTCv",
    chain: "base",
  },
  "0xc673ef7791724f0dcca38adb47fbb3aef3db6c80": {
    decimals: 8,
    symbol: "LiquidBeraBTC",
    chain: "base",
  },
  "0x5f46d540b6ed704c3c8789105f30e075aa900726": {
    decimals: 8,
    symbol: "LiquidBTC",
    chain: "base",
  },
  "0x08c6f91e2b681faf5e17227f2a44c307b3c1364c": {
    decimals: 6,
    symbol: "LiquidUSD",
    chain: "base",
  },
  "0x08a1c30bbb26425c1031ee9e43fa0b9960742539": { decimals: 6, symbol: "LNDX", chain: "base" },
  "0x866a2bf4e572cbcf37d5071a7a58503bfb36be1b": { decimals: 6, symbol: "M", chain: "base" },
  "0x812ba41e071c7b7fa4ebcfb62df5f45f6fa853ee": {
    decimals: 9,
    symbol: "Neiro",
    chain: "base",
  },
  "0xb60fdf036f2ad584f79525b5da76c5c531283a1b": { decimals: 9, symbol: "NEMO", chain: "base" },
  "0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5": { decimals: 8, symbol: "NOTE", chain: "base" },
  "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5": { decimals: 9, symbol: "OHM", chain: "base" },
  "0x9e18d5bab2fa94a6a95f509ecb38f8f68322abd3": {
    decimals: 9,
    symbol: "OMIKAMI",
    chain: "base",
  },
  "0xd3043d66afe00344c115f7f81d18277c5c718ff8": {
    decimals: 6,
    symbol: "OmUSD",
    chain: "base",
  },
  "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e": {
    decimals: 8,
    symbol: "PumpBTC",
    chain: "base",
  },
  "0x6c3ea9036406852006290770bedfcaba0e23a0e8": {
    decimals: 6,
    symbol: "PYUSD",
    chain: "base",
  },
  "0x690031313d70c2545357f4487c6a3f134c434507": { decimals: 9, symbol: "QQQ", chain: "base" },
  "0x4123a133ae3c521fd134d7b13a2dec35b56c2463": { decimals: 8, symbol: "QRDO", chain: "base" },
  "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d": {
    decimals: 8,
    symbol: "RenBTC",
    chain: "base",
  },
  "0x2bd1f344a2398340c2b1119da98816ea723f5f0f": { decimals: 6, symbol: "ROME", chain: "base" },
  "0xa43d9f9982ba219e8cbc442aec1304ad014caaa5": {
    decimals: 6,
    symbol: "RsGIF",
    chain: "base",
  },
  "0x526be1c610616be0e8e69893fc6766fddfbada61": { decimals: 6, symbol: "RTBL", chain: "base" },
  "0xd31a59c85ae9d8edefec411d448f90841571b89c": { decimals: 9, symbol: "SOL", chain: "base" },
  "0xa670d7237398238de01267472c6f13e5b8010fd1": { decimals: 6, symbol: "SOMM", chain: "base" },
  "0xe0f63a424a4439cbe457d80e4f4b51ad25b2c56c": { decimals: 8, symbol: "SPX", chain: "base" },
  "0x7ac168c81f4f3820fa3f22603ce5864d6ab3c547": {
    decimals: 8,
    symbol: "StACME",
    chain: "base",
  },
  "0xb60acd2057067dc9ed8c083f5aa227a244044fd6": {
    decimals: 9,
    symbol: "StTAO",
    chain: "base",
  },
  "0x8db2350d78abc13f5673a411d4700bcf87864dde": {
    decimals: 8,
    symbol: "SwBTC",
    chain: "base",
  },
  "0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a": {
    decimals: 8,
    symbol: "ORN",
    chain: "base",
  },

  // decimals 為 18 的 tokens (Base chain)
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
    decimals: 18,
    symbol: "ETH",
    chain: "base",
  },
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    decimals: 18,
    symbol: "WETH",
    chain: "base",
  },
  "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0": {
    decimals: 18,
    symbol: "wstETH",
    chain: "base",
  },
  "0x8f08b70456eb22f6109f57b8fafe862ed28e6040": {
    decimals: 18,
    symbol: "KING",
    chain: "base",
  },

  // Mainnet tokens - 非 18 decimals
  "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9": { decimals: 8, symbol: "AGIX", chain: "mainnet" },
  "0xd5255cc08ebaf6d54ac9448822a18d8a3da29a42": { decimals: 6, symbol: "AIDaUSDC", chain: "mainnet" },
  "0x00000000efe302beaa2b3e6e1b18d08d69a9012a": { decimals: 6, symbol: "AUSD", chain: "mainnet" },
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161": { decimals: 9, symbol: "AMPL", chain: "mainnet" },
  "0x0d8775f648430679a709e98d2b0cb6250d2887ef": { decimals: 18, symbol: "BAT", chain: "mainnet" },
  "0x9be89d2a4cd102d8fecc6bf9da793be995c22541": { decimals: 8, symbol: "BBTC", chain: "mainnet" },
  "0x0590cc9232ebf68d81f6707a119342ecb9": { decimals: 9, symbol: "BCAT", chain: "mainnet" },
  "0xbea0000029ad1c77d3d5d23ba2d8893db9d1efab": { decimals: 6, symbol: "BEAN", chain: "mainnet" },
  "0x9bf1d7d63dd7a4ce167cf4866388226eeefa702e": { decimals: 18, symbol: "BEN", chain: "mainnet" },
  "0x72e4f9f808c49a2a61de9c5896298920dc4eeea9": { decimals: 8, symbol: "BITCOIN", chain: "mainnet" },
  "0x5732046a883704404f284ce41ffadd5b007fd668": { decimals: 18, symbol: "BLZ", chain: "mainnet" },
  "0x8c41455aaa8d6aba3150058d4964349294bf78a3": { decimals: 9, symbol: "BULL", chain: "mainnet" },
  "0x4fabb145d64652a948d72533023f6e7a623c7c53": { decimals: 18, symbol: "BUSD", chain: "mainnet" },
  "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf": { decimals: 8, symbol: "CbBTC", chain: "mainnet" },
  "0x34bd6dba456bc31c2b3393e499fa10bed32a9370": { decimals: 17, symbol: "CtLBTC", chain: "mainnet" },
  "0xf0939011a9bb95c3b791f0cb546377ed2693a574": { decimals: 8, symbol: "CRYO", chain: "mainnet" },
  "0x6b175474e89094c44da98b954eedeac495271d0f": { decimals: 18, symbol: "DAI", chain: "mainnet" },
  "0x34bd6dba456bc31c2b3393e499fa10bed32a9370": { decimals: 17, symbol: "CtLBTC", chain: "mainnet" },
  "0xdb25f211ab05b1c97d595516f45794528a807ad8": { decimals: 2, symbol: "EURS", chain: "mainnet" },
  "0xc581b735a1688071a1746c968e0798d642ede491": { decimals: 6, symbol: "EURT", chain: "mainnet" },
  "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c": { decimals: 6, symbol: "EURC", chain: "mainnet" },
  "0xc96de26018a54d51c097160568752c4e3bd6c364": { decimals: 8, symbol: "FBTC", chain: "mainnet" },
  "0xfd56a3dcfc0690881a466ae432d71bb2db588083": { decimals: 6, symbol: "FLEET", chain: "mainnet" },
  "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e": { decimals: 9, symbol: "FLOKI", chain: "mainnet" },
  "0x465a5a630482f3abd6d3b84b39b29b07214d19e5": { decimals: 8, symbol: "FUSDC", chain: "mainnet" },
  "0xd1d2eb1b1e90b638588728b4130137d262c87cae": { decimals: 8, symbol: "GALA", chain: "mainnet" },
  "0xe3c408bd53c31c085a1746af401a4042954ff740": { decimals: 8, symbol: "GreenMT", chain: "mainnet" },
  "0x8390a1da07e376ef7add4be859ba74fb83aa02d5": { decimals: 9, symbol: "GROK", chain: "mainnet" },
  "0x393f1d49425d94f47b26e591a9d111df5cd61065": { decimals: 2, symbol: "GUA", chain: "mainnet" },
  "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd": { decimals: 2, symbol: "GUSD", chain: "mainnet" },
  "0x3819f64f282bf135d62168c1e513280daf905e06": { decimals: 9, symbol: "HDRN", chain: "mainnet" },
  "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39": { decimals: 8, symbol: "HEX", chain: "mainnet" },
  "0xb8919522331c59f5c16bdfaa6a121a6e03a91f62": { decimals: 6, symbol: "HOME", chain: "mainnet" },
  "0x20157dbabbe84e3bbfe68c349d0d44e48ae7b5ad2": { decimals: 8, symbol: "IBTC", chain: "mainnet" },
  "0xfc4913214444af5c715cc9f7b52655e788a569ed": { decimals: 9, symbol: "ICSA", chain: "mainnet" },
  "0x1fdd61ef9a5c31b9a2abc7d39c139c779e8412af": { decimals: 9, symbol: "JJ", chain: "mainnet" },
  "0xceb67a66c2c8a90980da3a50a3f96c07525a26cb": { decimals: 9, symbol: "KABOSU", chain: "mainnet" },
  "0x96543ef8d2c75c26387c1a319ae69c0bee6f3fe7": { decimals: 6, symbol: "KUJI", chain: "mainnet" },
  "0x8236a87084f8b84306f72007f36f2618a5634494": { decimals: 8, symbol: "LBTC", chain: "mainnet" },
  "0x5401b8620e5fb570064ca9114fd1e135fd77d57c": { decimals: 8, symbol: "LBTCv", chain: "mainnet" },
  "0xc673ef7791724f0dcca38adb47fbb3aef3db6c80": { decimals: 8, symbol: "LiquidBeraBTC", chain: "mainnet" },
  "0x5f46d540b6ed704c3c8789105f30e075aa900726": { decimals: 8, symbol: "LiquidBTC", chain: "mainnet" },
  "0x08c6f91e2b681faf5e17227f2a44c307b3c1364c": { decimals: 6, symbol: "LiquidUSD", chain: "mainnet" },
  "0x08a1c30bbb26425c1031ee9e43fa0b9960742539": { decimals: 6, symbol: "LNDX", chain: "mainnet" },
  "0x0eecbdbf7331b8a50fcd0bf2c267bf47bd876054": { decimals: 6, symbol: "LpUSDC", chain: "mainnet" },
  "0x866a2bf4e572cbcf37d5071a7a58503bfb36be1b": { decimals: 6, symbol: "M", chain: "mainnet" },
  "0xdd468a1ddc392dcdbef6db6e34e89aa338f9f186": { decimals: 18, symbol: "MezoUSD", chain: "mainnet" },
  "0xdd629e5241cbc5919847783e6c96b2de4754e438": { decimals: 18, symbol: "MTBILL", chain: "mainnet" },
  "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4": { decimals: 24, symbol: "NEAR", chain: "mainnet" },
  "0x812ba41e071c7b7fa4ebcfb62df5f45f6fa853ee": { decimals: 9, symbol: "Neiro", chain: "mainnet" },
  "0xb60fdf036f2ad584f79525b5da76c5c531283a1b": { decimals: 9, symbol: "NEMO", chain: "mainnet" },
  "0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5": { decimals: 8, symbol: "NOTE", chain: "mainnet" },
  "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5": { decimals: 9, symbol: "OHM", chain: "mainnet" },
  "0x9e18d5bab2fa94a6a95f509ecb38f8f68322abd3": { decimals: 9, symbol: "OMIKAMI", chain: "mainnet" },
  "0xd3043d66afe00344c115f7f81d18277c5c718ff8": { decimals: 6, symbol: "OmUSD", chain: "mainnet" },
  "0x45804880de22913dafe09f4980848ece6ecbaf78": { decimals: 18, symbol: "PAXG", chain: "mainnet" },
  "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e": { decimals: 8, symbol: "PumpBTC", chain: "mainnet" },
  "0x6c3ea9036406852006290770bedfcaba0e23a0e8": { decimals: 6, symbol: "PYUSD", chain: "mainnet" },
  "0x690031313d70c2545357f4487c6a3f134c434507": { decimals: 9, symbol: "QQQ", chain: "mainnet" },
  "0x4123a133ae3c521fd134d7b13a2dec35b56c2463": { decimals: 8, symbol: "QRDO", chain: "mainnet" },
  "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d": { decimals: 8, symbol: "RenBTC", chain: "mainnet" },
  "0x2bd1f344a2398340c2b1119da98816ea723f5f0f": { decimals: 6, symbol: "ROME", chain: "mainnet" },
  "0xa43d9f9982ba219e8cbc442aec1304ad014caaa5": { decimals: 6, symbol: "RsGIF", chain: "mainnet" },
  "0x526be1c610616be0e8e69893fc6766fddfbada61": { decimals: 6, symbol: "RTBL", chain: "mainnet" },
  "0xb27d1729489d04473631f0afaca3c3a7389ac9f8": { decimals: 18, symbol: "Silo_CRV", chain: "mainnet" },
  "0xd31a59c85ae9d8edefec411d448f90841571b89c": { decimals: 9, symbol: "SOL", chain: "mainnet" },
  "0xa670d7237398238de01267472c6f13e5b8010fd1": { decimals: 6, symbol: "SOMM", chain: "mainnet" },
  "0xe0f63a424a4439cbe457d80e4f4b51ad25b2c56c": { decimals: 8, symbol: "SPX", chain: "mainnet" },
  "0x139450c2dcef827c9a2a0bb1cb5506260940c9fd": { decimals: 6, symbol: "SSuperUSD", chain: "mainnet" },
  "0x7ac168c81f4f3820fa3f22603ce5864d6ab3c547": { decimals: 8, symbol: "StACME", chain: "mainnet" },
  "0xb27d1729489d04473631f0afaca3c3a7389ac9f8": { decimals: 18, symbol: "Silo_CRV", chain: "mainnet" },
  "0xb2723d5df98689eca6a4e7321121662ddb9b3017": { decimals: 8, symbol: "StrBTC", chain: "mainnet" },
  "0xb60acd2057067dc9ed8c083f5aa227a244044fd6": { decimals: 9, symbol: "StTAO", chain: "mainnet" },
  "0x8db2350d78abc13f5673a411d4700bcf87864dde": { decimals: 8, symbol: "SwBTC", chain: "mainnet" },
  "0x643c4e15d7d62ad0abec4a9bd4b001aa3ef52d66": { decimals: 18, symbol: "SYRUP", chain: "mainnet" },
  "0x80ac24aa929eaf5013f6436cda2a7ba190f5cc0b": { decimals: 6, symbol: "SyrupUSDC", chain: "mainnet" },
  "0x6bf340ddb729d82af1f6443a0ea0d79647b1c3ddf": { decimals: 8, symbol: "TacBTC", chain: "mainnet" },
  "0x699e04f98de2fc395a7dcbf36b48ec837a976490": { decimals: 6, symbol: "TacUSD", chain: "mainnet" },
  "0x485d17a6f1b8780392d53d64751824253011a260": { decimals: 8, symbol: "TIME", chain: "mainnet" },
  "0x582d872a1b094fc48f5de31d3b73f2d9be47def1": { decimals: 9, symbol: "TON", chain: "mainnet" },
  "0x2c537e5624e4af88a7ae4060c022609376c8d0eb": { decimals: 6, symbol: "TRYb", chain: "mainnet" },
  "0xc5f9f28328a5c7b55dd726ce4b6c0ee17b7eb89b": { decimals: 9, symbol: "TSUKA", chain: "mainnet" },
  "0x961dd84059505d59f82ce4fb87d3c09bec65301d": { decimals: 8, symbol: "TXJP", chain: "mainnet" },
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { decimals: 6, symbol: "USDT", chain: "mainnet" },
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { decimals: 6, symbol: "USDC", chain: "mainnet" },
  "0xc8cf6d7991f15525488b2a83df53468d682ba4b0": { decimals: 18, symbol: "SUSDf", chain: "mainnet" },
  "0x0e573ce2736dd9637a0b21058352e1667925c7a8": { decimals: 6, symbol: "USDV", chain: "mainnet" },
  "0xa693b19d2931d498c5b318df961919bb4aee87a5": { decimals: 6, symbol: "UST", chain: "mainnet" },
  "0x3c4b6e6e1ea3d4863700d7f76b36b7f3d3f13e3d": { decimals: 8, symbol: "VGX", chain: "mainnet" },
  "0x0a6e7ba5042b38349e437ec6db6214aec7b0a012": { decimals: 6, symbol: "WA7A5", chain: "mainnet" },
  "0xe83ce6bfb580583bd6a62b4be7b34fc25f02910d": { decimals: 8, symbol: "WABBC", chain: "mainnet" },
  "0xdf4ef6ee483953fe3b84abd08c6a060445c01170": { decimals: 8, symbol: "WACME", chain: "mainnet" },
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": { decimals: 8, symbol: "WBTC", chain: "mainnet" },
  "0x2e3cfe45e3ee7c017277f22e35d2f29edc99d570": { decimals: 8, symbol: "WDAG", chain: "mainnet" },
  "0xb6667b04cb61aa16b59617f90ffa068722cf21da": { decimals: 6, symbol: "WUSD_V1", chain: "mainnet" },
  "0x437cc33344a0b27a429f795ff6b469c72698b291": { decimals: 6, symbol: "WM", chain: "mainnet" },
  "0x263b6b028f3e4ed8c4329eb2b5f409ee38d97296": { decimals: 6, symbol: "WMT", chain: "mainnet" },
  "0xdbb5cf12408a3ac17d668037ce289f9ea75439d7": { decimals: 6, symbol: "WMTX", chain: "mainnet" },
  "0x8143182a775c54578c8b7b3ef77982498866945d": { decimals: 8, symbol: "WQUIL", chain: "mainnet" },
  "0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44": { decimals: 9, symbol: "WTAO", chain: "mainnet" },
  "0xdb85f6685950e285b1e611037bebe5b34e2b7d78": { decimals: 18, symbol: "WZANO", chain: "mainnet" },
  "0x68749665ff8d2d112fa859aa293f07a622782f38": { decimals: 6, symbol: "XAUt", chain: "mainnet" },
  "0xd7efb00d12c2c13131fd319336fdf952525da2af": { decimals: 4, symbol: "XPR", chain: "mainnet" },
  "0xe2fc85bfb48c4cf147921fbe110cf92ef9f26f94": { decimals: 6, symbol: "XUSD", chain: "mainnet" },
  "0x01791f726b4103694969820be083196cc7c045ff": { decimals: 18, symbol: "YB", chain: "mainnet" },
  "0xb9ef770b6a5e12e45983c5d80545258aa38f3b78": { decimals: 10, symbol: "ZCN", chain: "mainnet" },
  "0x89a8c847f41c0dfa6c8b88638bacca8a0b777da7": { decimals: 18, symbol: "ELX", chain: "mainnet" },
  "0x34bd6dba456bc31c2b3393e499fa10bed32a9370": { decimals: 17, symbol: "CtLBTC", chain: "mainnet" },
  "0x15700b564ca08d9439c58ca5053166e8317aa138": { decimals: 18, symbol: "DeUSD", chain: "mainnet" },
  "0x89b69f2d1adffa9a253d40840b6baa7fc903d697": { decimals: 9, symbol: "Dione", chain: "mainnet" },
  "0x798d1be841a82a273720ce31c822c61a67a601c3": { decimals: 9, symbol: "DIGG", chain: "mainnet" },
};

// 保存當前的 tokenDecimals 對象
let tokenDecimals: Record<string, TokenInfo> = { ...defaultTokenDecimals };

// Runtime cache for tokens fetched from RPC
const runtimeTokenCache: Record<string, TokenInfo> = {};

// Pending batch fetch promise to avoid duplicate requests
let pendingBatchFetch: Promise<void> | null = null;
const pendingTokenAddresses: Set<string> = new Set();

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
export const getTokenDecimals = async (tokenAddress: string): Promise<number | null> => {
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
export const batchGetTokenInfo = async (tokenAddresses: string[]): Promise<Map<string, TokenInfo>> => {
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
      const { batchFetchTokenDecimalsWithFallback } = await import("./rpcClient");
      const rpcResults = await batchFetchTokenDecimalsWithFallback(addressesToFetch);
      
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
      const failedAddresses = addressesToFetch.filter((address) => !results.has(address));
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
export const getTokenInfo = async (tokenAddress: string): Promise<TokenInfo | null> => {
  if (!tokenAddress) {
    return null;
  }

  const results = await batchGetTokenInfo([tokenAddress]);
  return results.get(tokenAddress.toLowerCase()) || null;
};

// 獲取按鏈篩選的 tokens
export const getTokensByChain = (chain: "mainnet" | "base"): Record<string, TokenInfo> => {
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
