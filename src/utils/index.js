import * as web3Utils from 'web3-utils'
import { ethers } from 'ethers'

export function isAddress(address) {
  return web3Utils.isAddress(address)
}

export function getContract(address, abi, library, account) {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new library.eth.Contract(abi, address, { from: account })
}
