import { NetworkConnector } from '@web3-react/network-connector'

const POLLING_INTERVAL = 4000
const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/a28f35f70591419cbf422c5e58cd047d',
}

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1] },
  defaultChainId: 1,
  pollingInterval: POLLING_INTERVAL,
})
