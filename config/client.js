const webpack = require('webpack')
const merge = require('webpack-merge')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const baseConfig = require('./base.js')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = merge(baseConfig, {
  plugins: [
    new ManifestPlugin({
      seed: {
        manifest_version: 2,
        name: 'Bet_Extansion_Chrome',
        version: '1.0',
        browser_action: {
          default_icon: 'logo.png',
          default_popup: 'index.html'
        },

        icons: {
          16: 'logo.png',
          48: 'logo.png',
          128: 'logo.png'
        },

        background: {
          scripts: ['background.js']
        },

        permissions: [
          'activeTab'
        ]
      }
    })
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
  // module.exports.plugins = (module.exports.plugins || []).concat([
  //     new BundleAnalyzerPlugin({
  //     analyzerPort: 9999
  //   })
  // ])
}
