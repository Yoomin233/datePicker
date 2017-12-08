const path = require('path')
const webpack = require('webpack')
const os = require('os')

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        use: [
          {
            loader: 'happypack/loader'
          }
        ],
        // loader: 'babel-loader',
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
  },
  plugins: [
    new ProgressBarPlugin(),
    new HappyPack({
      loaders: [
        {
          loader: 'babel-loader'
        }
      ],
      threads: os.cpus().length
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../public'),
      to: './public'
    }, {
      from: path.join(__dirname, '../public/webpack.svg'),
      to: './'
    }]),
    // create index.html automatically
    new HtmlWebpackPlugin({
      title: 'title defined in htmlWebpackPlugin',
      // favicon: __dirname + '/favicon.png',
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      chunks: ['main', 'vendor', 'manifest'],
      favicon: './public/webpack.svg'
    })
  ]
}