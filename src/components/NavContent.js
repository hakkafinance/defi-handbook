import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import GitHubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const tokenLinks = [
  {
    text: 'ERC20',
    href: '/token/erc20',
  },
  {
    text: 'Non-standard ERC20',
    href: '/token/non-standard-erc20',
  },
  {
    text: 'Safe ERC20 Library',
    href: '/token/safe-erc20-library',
  },
  {
    text: 'Permit / Max unit allowance',
    href: '/token/permit',
  },
  {
    text: 'Well-known ERC20 Addresses',
    href: '/token/erc20-addresses',
  },
]

const exchangeLinks = [
  {
    text: 'Uniswap',
    href: '/exchange/uniswap',
  },
  {
    text: 'Kyber Network',
    href: '/exchange/kyber-network',
  },
  {
    text: 'Oasis',
    href: '/exchange/oasis',
  },
]

const lendingLinks = [
  {
    text: 'Compound',
    href: '/lending/compound',
  },
  {
    text: 'Fulcrum',
    href: '/lending/fulcrum',
  },
  {
    text: 'AAVE',
    href: '/lending/aave',
  },
  {
    text: 'DDEX',
    href: '/lending/ddex',
  },
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '256px',
    height: 'calc(100% - 64px)',
    overflow: 'auto',
  },
  listItem: {
    margin: '8px 0',
  },
  listItemSelected: {
    borderRadius: '18px',
  },
  nested: {
    margin: '8px 0',
    paddingLeft: theme.spacing(4),
  },
}))

function NavPanel(props) {
  const { title, links = [] } = props

  const classes = useStyles()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(
    links.map(link => link.href).includes(router.asPath),
  )

  useEffect(() => {
    if (router.asPath) {
      setIsOpen(links.map(link => link.href).includes(router.asPath))
    }
  }, [links, router.asPath])

  return (
    <>
      <ListItem
        button
        className={classes.listItem}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {links.map(link => (
            <Link href={link.href} key={link.href}>
              <ListItem
                button
                className={classes.nested}
                classes={{ selected: classes.listItemSelected }}
                selected={router.asPath === link.href}
              >
                <ListItemText primary={link.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default function NavContent() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <List component='nav' className={classes.root}>
      <Link href='/tools'>
        <ListItem
          button
          component='a'
          className={classes.listItem}
          classes={{ selected: classes.listItemSelected }}
          selected={router.asPath === '/tools'}
        >
          <ListItemText style={{ textAlign: 'center' }}>
            <span role='img' aria-label='fire'>
              🔥
            </span>{' '}
            <Typography component='span' variant='h6'>
              Tools
            </Typography>{' '}
            <span role='img' aria-label='fire'>
              🔥
            </span>
          </ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <Link href='/'>
        <ListItem
          button
          className={classes.listItem}
          component='a'
          classes={{ selected: classes.listItemSelected }}
          selected={router.asPath === '/'}
        >
          <ListItemText primary='Table of Content' />
        </ListItem>
      </Link>
      <NavPanel title='Token' links={tokenLinks} />
      <NavPanel title='Exchange' links={exchangeLinks} />
      <NavPanel title='Lending' links={lendingLinks} />
      <Divider />
      <ListItem
        button
        component='a'
        className={classes.listItem}
        href='https://github.com/hakka-finance/defi-handbook'
        target='_blank'
      >
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText>GitHub</ListItemText>
      </ListItem>
    </List>
  )
}

NavContent.propTypes = {}
NavContent.defaultProps = {}
