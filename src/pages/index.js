import React from 'react'
import NextLink from 'next/link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const links = [
  { href: '/tools', text: 'Tools' },
  { href: '/token/erc20', text: 'ERC20' },
  { href: '/token/non-standard-erc20', text: 'Non Standard ERC20' },
  { href: '/token/safe-erc20-library', text: 'Safe ERC20 Library' },
  { href: '/token/permit', text: 'Permit / Max unit allowance' },
  { href: '/token/erc20-addresses', text: 'ERC20 Addresses' },
  { href: '/exchange/uniswap', text: 'Uniswap' },
  { href: '/exchange/kyber-network', text: 'Kyber Network' },
  { href: '/exchange/oasis', text: 'Oasis' },
  { href: '/lending/compound', text: 'Compound' },
  { href: '/lending/fulcrum', text: 'Fulcrum' },
  { href: '/lending/aave', text: 'AAVE' },
  { href: '/lending/ddex', text: 'DDEX' },
]

export default function Index() {
  return (
    <div>
      <Typography variant='h4'>Table of Content</Typography>
      <List>
        {links.map(link => (
          <NextLink key={link.href} href={link.href}>
            <ListItem button>
              <Link href={link.href}>{link.text}</Link>
            </ListItem>
          </NextLink>
        ))}
      </List>
    </div>
  )
}
