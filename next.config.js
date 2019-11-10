const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
    ]
  },
  plugins: [
    new workboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'static/sw.js'
    })
  ]
}