/* eslint-disable padding-line-between-statements */
/* eslint-disable lines-around-comment */
const path = require('path')
const nextTranspilePlugins = require('next-transpile-modules')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
})

const withTM = nextTranspilePlugins(() => {
  '@fullcalendar/common', '@fullcalendar/react', '@fullcalendar/daygrid', '@fullcalendar/list', '@fullcalendar/timegrid'
})

module.exports = withTM({
  trailingSlash: true,
  output: 'standalone',
  basePath: '/admin',
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION' // your next configs go here
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  }
})

// module.exports = withBundleAnalyzer(
//   withTM({
//     trailingSlash: true,
//     output: 'standalone',
//     reactStrictMode: false,
//     env: {
//       NEXT_PUBLIC_ENV: 'PRODUCTION' // your next configs go here
//     },
//     webpack: config => {
//       config.resolve.alias = {
//         ...config.resolve.alias,
//         apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
//       }

//       return config
//     },
//     eslint: {
//       ignoreDuringBuilds: true
//     }
//   })
// )
