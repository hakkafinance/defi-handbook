import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FAF4E6',
    },
    secondary: {
      main: '#C97F4E',
    },
    background: {
      default: '#F0EBE1',
    },
  },
})
const theme = responsiveFontSizes(muiTheme)

export default function({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
