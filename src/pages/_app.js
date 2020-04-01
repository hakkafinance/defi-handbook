import React from 'react'
import Head from 'next/head'
import Web3Provider from '../components/Web3Provider'
import Web3Manager from '../components/Web3Manager'
import ThemeProvider from '../components/ThemeProvider'
import MarkdownProvider from '../components/MarkdownProvider'
import AppLayout from '../components/AppLayout'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DeFi Handbook</title>
        <meta property='name' content='DeFi Handbook' />
        <meta
          property='description'
          content='DeFi Handbook make easier for you to dive into DeFi protocols'
        />
        <meta property='image' content='/images/handbook-rollout.png' />
        <meta property='og:title' content='DeFi Handbook' />
        <meta
          property='og:description'
          content='DeFi Handbook make easier for you to dive into DeFi protocols'
        />
        <meta property='og:url' content='https://defi-handbook.netlify.com' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/images/og-image.png' />
        <meta property='og:image:width' content='600' />
        <meta property='og:image:height' content='315' />
      </Head>
      <Web3Provider>
        <ThemeProvider>
          <MarkdownProvider>
            <Web3Manager>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </Web3Manager>
          </MarkdownProvider>
        </ThemeProvider>
      </Web3Provider>
    </>
  )
}
