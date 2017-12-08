const path = require('path')
const webpack = require('webpack')

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    main: isDev ? [
      'react-hot-loader/patch',
      './src/main.js'
    ] : ['./src/main.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        use: isDev ? [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ] : ExtractTextWebpackPlugin.extract({
          // incase extract is not a success
          fallback: 'style-loader',
          use: 'css-loader',
        })
        // loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}