import React from 'react'
import Box from '@material-ui/core/Box'
import ChecksumAddressFormatter from '../components/tools/ChecksumAddressFormatter'
import ContractAddressChecker from '../components/tools/ContractAddressChecker'
import FuncSigGenerator from '../components/tools/FuncSigGenerator'
import FuncSigSearch from '../components/tools/FuncSigSearch'
import TokenToExchange from '../components/tools/TokenToExchange'

export default function Tools() {
  return (
    <>
      <Box my={3}>
        <ChecksumAddressFormatter />
      </Box>
      <Box my={3}>
        <ContractAddressChecker />
      </Box>
      <Box my={3}>
        <FuncSigGenerator />
      </Box>
      <Box my={3}>
        <FuncSigSearch />
      </Box>
      <Box my={3}>
        <TokenToExchange />
      </Box>
    </>
  )
}
