import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Highlight } from 'react-instantsearch-dom'
import SearchBox from './SearchBox'
import Hits from './Hits'

const searchClient = algoliasearch(
  'JVWAQMVVQC',
  'b8512cd5df9c6beb85aa4929f7514235',
)

const useStyles = makeStyles(theme => ({
  paper: {
    width: '90%',
    maxWidth: '400px',
    maxHeight: `calc(100vh - 64px)`,
    margin: 'auto',
    overflow: 'auto',
  },
  hit: {
    cursor: 'pointer',
  },
}))

export default function Search() {
  const classes = useStyles()
  const anchorRef = React.useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = useCallback(event => {
    setIsOpen(Boolean(event.currentTarget.value))
  }, [])

  const handleClose = useCallback(event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setIsOpen(false)
  }, [])

  const Hit = ({ hit }) => (
    <Link href='/'>
      <Card className={classes.hit}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            <Highlight hit={hit} attribute='title' tagName='mark' />
          </Typography>
          <Typography variant='body2' component='p' color='textSecondary'>
            <Highlight hit={hit} attribute='content' tagName='mark' />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <InstantSearch searchClient={searchClient} indexName='post'>
      <SearchBox inputRef={anchorRef} onSubmit={handleToggle} />
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        placement='bottom-end'
        transition
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={4} variant='outlined' className={classes.paper}>
              <Box pt={3}>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <Hits hitComponent={Hit} />
                  </div>
                </ClickAwayListener>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </InstantSearch>
  )
}
