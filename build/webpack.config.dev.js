const webpack = require('webpack')
const path = require('path')

const webpackBaseConfig = require('./webpack.config.base')

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = Object.assign(webpackBaseConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    // you can only use [chunkhash] in prod
    filename: '[name].[hash:8].js',
    // unnecessary for the dev server. used mainly for serving purpose(CDN, etc). 
    // publicPath: '/'
  },
  devServer: {
    // server files from which directory(in this example, localhost:8080 => ./)
    // contentBase: './src',
    historyApiFallback: true,
    // reload the entire page if file change(but will try hmr first if 'hot' enabled, else, reload the page directly)
    hot: true,
    // dont refresh page if module can not be accepted
    hotOnly: true
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: './public',
      to: './public'
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'title defined in htmlWebpackPlugin',
      // favicon: __dirname + '/favicon.png',
      template: path.join(__dirname, '../src/index.html'),
      filename: './index.html',
      chunks: ['main']
    })
  ]
})