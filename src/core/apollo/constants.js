import { ChainId } from "../constants";
export const GRAPH_HOST = {
  [ChainId.MAINNET]: "https://api.thegraph.com/subgraphs/name",
  [ChainId.RINKEBY]: "https://api.thegraph.com/subgraphs/name",
  [ChainId.SHIBUYA]: "https://graph.shibuya.standardtech.xyz/subgraphs/name",
  [ChainId.SHIDEN]: "https://graph.shiden.standardtech.xyz/subgraphs/name",
};

export const EXCHANGE = {
  [ChainId.MAINNET]: "/billjhlee/ethereum-exchange",
  [ChainId.RINKEBY]: "/billjhlee/rinkeby-exchange2",
  [ChainId.SHIBUYA]: "/digitalnativeinc/shibuya-exchange",
  [ChainId.SHIDEN]: "/digitalnativeinc/shiden-exchange",
};

export const MASTERCHEF = {
  [ChainId.MAINNET]: "/billjhlee/ethereum-master-pool",
  [ChainId.RINKEBY]: "/billjhlee/rinkeby-master-pool2",
  [ChainId.SHIBUYA]: "/digitalnativeinc/shibuya-master-pool",
  [ChainId.SHIDEN]: "/digitalnativeinc/shiden-master-pool",
};

export const BLOCKS = {
  [ChainId.MAINNET]: "/blocklytics/ethereum-blocks",
  [ChainId.RINKEBY]: "/billjhlee/rinkeby-blocks",
  [ChainId.SHIBUYA]: "/digitalnativeinc/shibuya-blocks",
  [ChainId.SHIDEN]: "/digitalnativeinc/shiden-blocks",
};

export const BAR = {
  [ChainId.MAINNET]: "/billjhlee/ethereum-dstnd",
};

export const getExchangeGraphAddr = (chainId) =>
  `${GRAPH_HOST[chainId]}${EXCHANGE[chainId]}`;
export const getBlocksGraphAddr = (chainId) =>
  `${GRAPH_HOST[chainId]}${BLOCKS[chainId]}`;
export const getMasterChefGraphAddr = (chainId) =>
  `${GRAPH_HOST[chainId]}${MASTERCHEF[chainId]}`;
export const getBarGraphAddr = (chainId) =>
  `${GRAPH_HOST[chainId]}${BAR[chainId]}`;
