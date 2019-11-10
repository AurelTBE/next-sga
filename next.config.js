const workboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
    ]
  },
  plugins: [
    new workboxPlugin.GenerateSW({
      swDest: 'static/sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
}; 