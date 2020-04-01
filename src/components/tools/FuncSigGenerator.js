import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { AbiCoder } from 'web3-eth-abi'

const abiCoder = new AbiCoder()
const solidityType = /(bool|string|address|bytes(3[0-2]|[1-2]\d|\d)?|u?int((((2?[048]|1[26]))[08])|((2?[159]|1[37]|)6)|(2?[26]|1[048])4|(2?[37]|1[159])2|[8])?)/
const format = /\w+\(((bool|string|address|bytes(3[0-2]|[1-2]\d|\d)?|u?int((((2?[048]|1[26]))[08])|((2?[159]|1[37]|)6)|(2?[26]|1[048])4|(2?[37]|1[159])2|[8])?)(\[\])?,?)+\)/

function toFunctionName(src = '') {
  const openParenthesesIndex = src.indexOf('(')
  const closeParenthesesIndex = src.indexOf(')')

  if (openParenthesesIndex === -1 || closeParenthesesIndex === -1) {
    throw Error('Invalid Function')
  }

  const name = src
    .slice(0, openParenthesesIndex)
    .replace('function', '')
    .trim()

  const parameterTypes = src
    .slice(openParenthesesIndex + 1, closeParenthesesIndex)
    .split(',')
    .map(parameter => parameter.trim().split(' ')[0])
    .map(type => {
      if (type === 'uint') {
        return 'uint256'
      }
      if (type === 'int') {
        return 'int256'
      }
      return type
    })

  if (!parameterTypes.every(type => solidityType.exec(type))) {
    throw Error('Invalid Solidity types')
  }

  return `${name}(${parameterTypes.join(',')})`
}

export default function FuncSigGenerator() {
  const [func, setFunc] = useState('')
  const [funcName, setFuncName] = useState()
  const [signature, setSignature] = useState()
  const [isError, setIsError] = useState()

  // check function format
  useEffect(() => {
    if (func) {
      try {
        const name = toFunctionName(func)
        setFuncName(name)
        setIsError(false)
      } catch (err) {
        setIsError(true)
      }
    } else {
      setIsError(false)
      setSignature()
    }
  }, [func])

  // get function signature
  useEffect(() => {
    if (funcName && format.exec(funcName)) {
      setSignature(abiCoder.encodeFunctionSignature(funcName))
    } else {
      setSignature()
    }
  }, [funcName])

  const renderResult = () => {
    if (signature && !isError) {
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
            <Typography variant='h6'>{signature}</Typography>
          </Box>
        </>
      )
    }
  }

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant='h6'>
          Generate function signature
        </Typography>
        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          label='Function name'
          placeholder='transfer(address,uint)'
          helperText={isError && 'Incorrect function format'}
          error={isError}
          value={func}
          onChange={event => setFunc(event.target.value)}
        />
        {renderResult()}
      </CardContent>
    </Card>
  )
}
