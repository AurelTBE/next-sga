const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({
      swSrc: './src/service-worker.js',
      swDest: 'static/service-worker.js',
      maximumFileSizeToCacheInBytes: 16 * 1024 * 1024,
    })
  ]
};