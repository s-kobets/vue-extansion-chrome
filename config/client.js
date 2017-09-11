const webpack = require('webpack')
const merge = require('webpack-merge')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const baseConfig = require('./base.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = merge(baseConfig, {
  plugins: [
    new ManifestPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /(en-gb|ru).js$/),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
      new BundleAnalyzerPlugin({
      analyzerPort: 9999
    })
  ])
}
