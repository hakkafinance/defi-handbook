import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { connectSearchBox } from 'react-instantsearch-dom'

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    marginRight: 8,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.grey[200],
    '&:hover': {
      background: theme.palette.grey[300],
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    borderRadius: 4,
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}))

function SearchBox(props) {
  const { currentRefinement, refine, onSubmit, inputRef } = props
  const classes = useStyles()

  const onChange = useCallback(
    event => {
      refine(event.currentTarget.value)
      onSubmit(event)
    },
    [onSubmit, refine],
  )

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        ref={inputRef}
        type='search'
        placeholder='Search…'
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={currentRefinement}
        onChange={onChange}
      />
    </div>
  )
}

export default connectSearchBox(SearchBox)
