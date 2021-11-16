export const TOKEN_DENY = [
  "0x495c7f3a713870f68f8b418b355c085dfdc412c3",
  "0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea",
  "0xe31debd7abff90b06bca21010dd860d8701fd901",
  "0xfc989fbb6b3024de5ca0144dc23c18a063942ac1",
];

export const PAIR_DENY = ["0xb6a741f37d6e455ebcc9f17e2c16d0586c3f57a5"];

export const EXCHANGE_CREATED_TIMESTAMP = 1599214239;

export const POOL_DENY = [];

export const SUSHI_TOKEN = "0x9040e237C3bF18347bb00957Dc22167D0f2b999d";

export const DEFAULT_CHAIN_ID = 1;

export const ChainId = {
  MAINNET: 1,
  RINKEBY: 4,
  SHIBUYA: 81,
  SHIDEN: 336,
};

export const SCANNERS = {
  [ChainId.RINKEBY]: {
    name: "Etherscan",
    url: "https://etherscan.io/",
    getUrl: (id) => {
      return `https://etherscan.io/address/${id}`;
    },
    getTxUrl: (id) => {
      return `https://etherscan.io/address/${id}`;
    },
  },
  [ChainId.RINKEBY]: {
    name: "Etherscan",
    url: "https://rinkeby.etherscan.io/",
    getUrl: (id) => {
      return `https://rinkeby.etherscan.io/address/${id}`;
    },
    getTxUrl: (id) => {
      return `https://rinkeby.etherscan.io/address/${id}`;
    },
  },
  [ChainId.SHIBUYA]: {
    name: "Subscan",
    url: "https://shibuya.subscan.io/",
    getUrl: (id) => {
      return `https://shibuya.subscan.io/account/${id}`;
    },
    getTxUrl: (id) => {
      return `https://shibuya.subscan.io/tx/${id}`;
    },
  },
  [ChainId.SHIDEN]: {
    name: "Subscan",
    url: "https://blockscout.com/shiden",
    getUrl: (id) => {
      return `https://blockscout.com/shiden/account/${id}`;
    },
    getTxUrl: (id) => {
      return `https://blockscout.com/shiden/tx/${id}`;
    },
  },
};

// all addrs should be lowercase
export const FACTORY_ADDRESS = {
  [ChainId.MAINNET]: "0x53ac1d1fa4f9f6c604b8b198ce29a50d28cba893",
  [ChainId.RINKEBY]: "0xf659492744608b595670c1508aa0f5b92b84b94d",
  [ChainId.SHIBUYA]: "0x0e60c35fcf3184dce5cf04d4b736e56f2de7caf7",
  [ChainId.SHIDEN]: "0x073386AE3292299a5814B00bC1ceB8f2bfC92c51",
};

export const MASTERPOOL_ADDRESS = {
  [ChainId.MAINNET]: "0xb9112feef2054acc4066c40e8c2784fa3e9d032f",
  [ChainId.RINKEBY]: "0x22079b36af1ab814350fff725cd8f67f3c70b753",
  [ChainId.SHIDEN]: "0x375eC65e75083Ee8545fA9168257Ac2a456DDAbb",
};

export const STND_ADDRESS = {
  [ChainId.MAINNET]: "0x9040e237c3bf18347bb00957dc22167d0f2b999d",
  [ChainId.RINKEBY]: "0xc8aeedb09f4d90d59ee47fed8c70d10fd267b2ab",
  [ChainId.SHIBUYA]: "0xb0a1aa4cb76c0e35d9ac9eba422bf76534bf155a",
  [ChainId.SHIDEN]: "0x722377a047e89ca735f09eb7cccab780943c4cb4",
};

export const DIVIDEND_POOL_ADDRESS = {
  [ChainId.MAINNET]: "",
  [ChainId.RINKEBY]: "0x45fa9f11b06dff3f4b04746629523c21fb2cadb9",
  [ChainId.SHIDEN]: "0x670cf2628816d95b36b1a4db2dfba80eaebd7b78",
};

export const XSTND_ADDRESS = {
  [ChainId.MAINNET]: "0xad41f311c835224447c54c98fadf5e0ad9eff077",
  [ChainId.SHIDEN]: "0xfc76114c5adebfa257153ea82b8594c3b25baebe",
};
