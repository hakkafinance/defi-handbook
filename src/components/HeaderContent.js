import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Link from 'next/link'
// import Search from './Search'

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  logo: {
    height: '32px',
    '@media screen and (min-width: 600px)': {
      height: '40px',
    },
  },
  grow: {
    flexGrow: 1,
  },
}))

export default function HeaderContent(props) {
  const classes = useStyles()

  return (
    <>
      <Link href='/'>
        <a style={{ display: 'contents' }}>
          <img className={classes.logo} src='/images/logo.svg' alt='logo' />
        </a>
      </Link>
      <div className={classes.grow} />
      {/* <Search /> */}
    </>
  )
}
