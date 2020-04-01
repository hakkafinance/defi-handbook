import React from 'react'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import Web3 from 'web3'
import { READ_ONLY } from '../constants'

const Web3ReadOnlyProvider = createWeb3ReactRoot(READ_ONLY)

function getLibrary(provider) {
  return new Web3(provider)
}

export default function Web3Provider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReadOnlyProvider getLibrary={getLibrary}>
        {children}
      </Web3ReadOnlyProvider>
    </Web3ReactProvider>
  )
}
