import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { isAddress, getContract } from '../../utils'
import { READ_ONLY, UNISWAP_FACTORY_ADDRESS } from '../../constants'
import UNISWAP_FACTORY_ABI from '../../constants/abis/uniswap_factory.json'
import ERC20_ABI from '../../constants/abis/erc20.json'

const useStyles = makeStyles({
  resultBox: {
    whiteSpace: 'nowrap',
    overflow: 'auto',
  },
})

const INITIAL_STATE = {
  name: '',
  symbol: '',
  decimals: 0,
  exchangeAddress: '',
}

const UPDATE = 'UPDATE'

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const { name, symbol, decimals, exchangeAddress } = payload
      return { name, symbol, decimals, exchangeAddress }
    }
    default: {
      throw Error(`Unexpected action type in the token reducer: ${type}`)
    }
  }
}

export default function TokenToExchange() {
  const classes = useStyles()
  const { active, library } = useWeb3React(READ_ONLY)

  const [tokenAddress, setTokenAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { name, symbol, decimals, exchangeAddress } = state

  const getData = useCallback(async () => {
    if (isAddress(tokenAddress) && library) {
      const tokenContract = getContract(tokenAddress, ERC20_ABI, library)
      const factoryContract = getContract(
        UNISWAP_FACTORY_ADDRESS,
        UNISWAP_FACTORY_ABI,
        library,
      )
      try {
        const [name, symbol, decimals, exchangeAddress] = await Promise.all([
          tokenContract.methods.name().call(),
          tokenContract.methods.symbol().call(),
          tokenContract.methods.decimals().call(),
          factoryContract.methods.getExchange(tokenAddress).call(),
        ])
        dispatch({
          type: UPDATE,
          payload: { name, symbol, decimals, exchangeAddress },
        })
      } catch {
        setErrorMessage('This address is an illegal ERC20 token.')
      }
    }
  }, [library, tokenAddress])

  useEffect(() => {
    if (active && library && tokenAddress) {
      if (isAddress(tokenAddress)) {
        setErrorMessage('')
        getData()
      } else {
        setErrorMessage('Incorrect Address')
      }
    } else {
      setErrorMessage('')
      dispatch({ type: UPDATE, payload: INITIAL_STATE })
    }
  }, [active, getData, library, tokenAddress])

  const renderResult = () => {
    if ((name || symbol || decimals || exchangeAddress) && !errorMessage) {
      return (
        <>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <ArrowDownwardIcon color='primary' />
          </Box>
          <Box
            my={1}
            p={2}
            border={1}
            borderRadius={4}
            className={classes.resultBox}
          >
            <Typography variant='body1'>
              Exchange Address: {exchangeAddress}
            </Typography>
          </Box>
          <Box
            my={1}
            p={2}
            border={1}
            borderRadius={4}
            className={classes.resultBox}
          >
            <Typography variant='body1'>Name: {name}</Typography>
            <Typography variant='body1'>Symbol: {symbol}</Typography>
            <Typography variant='body1'>Decimal: {decimals}</Typography>
          </Box>
        </>
      )
    }
  }

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant='h6'>
          Query Uniswap exchange address
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          label='Token address'
          helperText={errorMessage}
          error={!!errorMessage}
          value={tokenAddress}
          onChange={event => setTokenAddress(event.target.value)}
        />
        {renderResult()}
      </CardContent>
    </Card>
  )
}
