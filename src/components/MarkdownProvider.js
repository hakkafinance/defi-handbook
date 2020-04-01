import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CodeBlock from '../components/CodeBlock'

const inlineCode = props => (
  <Box
    component='span'
    px={0.5}
    py={0.2}
    borderRadius={4}
    bgcolor='grey.300'
    color='text.secondary'
    {...props}
  />
)

const blockquote = props => (
  <Box
    mx={5}
    my={2}
    p={2}
    borderRadius={4}
    borderLeft={4}
    borderColor='#C97F4E'
    bgcolor='grey.100'
    {...props}
  />
)

const components = {
  h1: props => (
    <Typography variant='h3' component='h1' gutterBottom {...props} />
  ),
  h2: props => (
    <Typography variant='h4' component='h2' gutterBottom {...props} />
  ),
  h3: props => (
    <Typography variant='h5' component='h3' gutterBottom {...props} />
  ),
  h4: props => (
    <Typography variant='h6' component='h4' gutterBottom {...props} />
  ),
  h5: props => (
    <Typography variant='subtitle1' component='h5' gutterBottom {...props} />
  ),
  h6: props => (
    <Typography variant='body1' component='h6' gutterBottom {...props} />
  ),
  p: props => <Typography variant='body2' component='p' {...props} />,
  table: props => (
    <TableContainer component={Paper}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: TableHead,
  tbody: TableBody,
  tr: props => <TableRow hover {...props} />,
  th: TableCell,
  td: TableCell,
  pre: props => <div {...props} />,
  code: CodeBlock,
  inlineCode,
  blockquote,
}

export default function MarkdownProvider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
