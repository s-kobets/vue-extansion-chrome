const path = require('path')
const postCssConfig = require('../postcss.config')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: './src/main.js',
    background: './src/background.js',
    content: './src/content.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  plugins: [
    new HtmlPlugin({
      title: 'Chrome Extension APP',
      filename: 'index.html',
      template: path.join(__dirname, '../index.html')
    }),

    new CopyWebpackPlugin([
      { from: './src/assets/img/logo.png', to: './' }
    ])

  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: postCssConfig,
          loaders: {
          },
          // other vue-loader options go here
          cssSourceMap: false
        }
      },
      {
        test: /\.html$/,
        loader: 'vue-template-loader',
        exclude: resolve('index.html'),
        options: {
          transformToRequire: {
            // The key should be an element name
            // The value should be an attribute name or an array of attribute names
            img: 'src'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },

  devtool: '#source-map'
}
