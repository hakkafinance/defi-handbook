import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { isAddress, toChecksumAddress } from 'web3-utils'

export default function ChecksumAddressFormatter() {
  const [normalAddress, setNormalAddress] = useState('')
  const [checksumAddress, setChecksumAddress] = useState('')

  const [isNormalError, setIsNormalError] = useState(false)
  const [isChecksumError, setIsChecksumError] = useState(false)

  // convert normal to checksum
  useEffect(() => {
    if (normalAddress) {
      if (isAddress(normalAddress)) {
        setIsNormalError(false)
        setChecksumAddress(toChecksumAddress(normalAddress))
      } else {
        setIsNormalError(true)
        setChecksumAddress('')
      }
    } else {
      setIsNormalError(false)
    }
  }, [normalAddress])

  // convert checksum to normal
  useEffect(() => {
    if (checksumAddress) {
      if (isAddress(checksumAddress)) {
        setIsChecksumError(false)
        setNormalAddress(checksumAddress.toLowerCase())
      } else {
        setIsChecksumError(true)
        setNormalAddress('')
      }
    } else {
      setIsChecksumError(false)
    }
  }, [checksumAddress])

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant='h6'>
          CHECKSUM Address Formatter
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          label='normal address'
          helperText={isNormalError && 'Incorrect Address'}
          error={isNormalError}
          value={normalAddress}
          onChange={event => setNormalAddress(event.target.value)}
        />
        <Box display='flex' justifyContent='center' alignItems='center'>
          <SwapVertIcon color='primary' />
        </Box>
        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          label='checksum address'
          helperText={isChecksumError && 'Incorrect Address'}
          error={isChecksumError}
          value={checksumAddress}
          onChange={event => setChecksumAddress(event.target.value)}
        />
      </CardContent>
    </Card>
  )
}
