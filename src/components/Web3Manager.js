import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { network } from '../connectors'
import { READ_ONLY } from '../constants'

export default function Web3Manager({ children }) {
  const { active, activate } = useWeb3React(READ_ONLY)
  useEffect(() => {
    if (!active) {
      activate(network)
    }
  }, [activate, active])

  return children
}
