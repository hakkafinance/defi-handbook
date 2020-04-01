import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { isHex } from 'web3-utils'

export default function FuncSigSearch() {
  const [signature, setSignature] = useState('')
  const [isError, setIsError] = useState(false)

  // check signature format
  useEffect(() => {
    if (!signature || isHex(signature)) {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }, [signature])

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant='h6'>
          Search function signature
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          label='Function Signature'
          placeholder='0x70a08231'
          helperText={isError && 'Invalid hex string'}
          error={isError}
          value={signature}
          onChange={event => setSignature(event.target.value)}
        />
        {!isError && signature && (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Button
              component={Link}
              variant='contained'
              color='primary'
              href={`https://www.4byte.directory/signatures/?bytes4_signature=${signature}`}
              target='_blank'
            >
              Search
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
