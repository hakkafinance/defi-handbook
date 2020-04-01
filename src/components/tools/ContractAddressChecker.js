import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { isAddress } from 'web3-utils'
import { READ_ONLY } from '../../constants'

export default function ContractAddressChecker() {
  const { active, library } = useWeb3React(READ_ONLY)
  const [address, setAddress] = useState('')
  const [isError, setIsError] = useState()
  const [isContract, setIsContract] = useState()

  // check address format
  useEffect(() => {
    if (!address || isAddress(address)) {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }, [address])

  // check address type
  useEffect(() => {
    async function check() {
      if (isAddress(address) && active && library) {
        const code = await library.eth.getCode(address)
        if (code.slice(2)) {
          setIsContract(true)
        } else {
          setIsContract(false)
        }
      }
    }

    if (address && isAddress(address)) {
      check()
    }
  }, [active, address, library])

  const renderResult = () => {
    if (
      active &&
      address &&
      isAddress(address) &&
      typeof isContract === 'boolean' &&
      !isError
    ) {
      return (
        <>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <ArrowDownwardIcon color='primary' />
          </Box>
          <Box
            mt={1}
            p={2}
            border={1}
            borderRadius={4}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='h6'>
              {isContract ? 'Contract' : 'External Owned Account (EOA)'}
            </Typography>
          </Box>
        </>
      )
    }
  }

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant='h6'>
          Check address is an EOA or a contract
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          label='address'
          helperText={isError && 'Incorrect Address'}
          error={isError}
          value={address}
          onChange={event => setAddress(event.target.value)}
        />
        {renderResult()}
      </CardContent>
    </Card>
  )
}
