const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  '@mui-treasury/layout',
  '@mui-treasury/mockup',
])

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
const withImages = require('next-images')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [withBundleAnalyzer, withTM, withMDX, withImages],
  {
    distDir: 'build',
    pageExtensions: ['js', 'jsx', 'mdx'],
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack', 'url-loader'],
      })

      return config
    },
  },
)
