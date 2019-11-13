const withOffline = require('next-offline')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nextConfig = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
    ]
  },
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  workboxOpts: {
    swDest: 'static/firebase-messaging-sw.js',
    importScripts: ['static/fcm.js'],
    maximumFileSizeToCacheInBytes: 16 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  webpack: (config) => {
    // this will output your push listener file to .next folder
    // check CopyWebpackPlugin docs if you want to change the destination (e.g. /static or /.next/static)
    config.plugins.push(new CopyWebpackPlugin(['static/push.js']));
    config.plugins.push(new CopyWebpackPlugin(['static/fcm.js']));
    return config
  },
}

module.exports = withOffline(nextConfig)