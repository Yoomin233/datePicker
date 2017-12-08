const webpack = require('webpack')

const path = require('path')

const webpackBaseConfig = require('./webpack.config.base')

const config = require('./config')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');

webpackBaseConfig.plugins.push(
  // clean dist directory
  new CleanWebpackPlugin(path.join(__dirname, '../dist'), {
    allowExternal: true
  }),
  // inject manifest chunk into index.html
  new InlineChunkWebpackPlugin({
    inlineChunks: ['manifest']
  }),
  // extract styles into style.css
  new ExtractTextWebpackPlugin({
    filename: 'stylesheets/style.[contenthash:8].css'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  // extract vendor.js
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:8].js',
    // at least two chunks need to contain a specific module before it's moved in to the 'vendor(stated above)' chunk
    minChunks: (module, count) => module.context && module.context.indexOf('node_modules') !== -1,
    chunks: ['main'],
    // bigger than 100KB
    minSize: 1024 * 100
  }),
  // extract webpack manifest
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
    filename: 'manifest.[hash:8].js'
  })
)

module.exports = Object.assign(webpackBaseConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    // you can only use [chunkhash] in prod
    filename: '[name].[chunkhash:8].js',
    // unnecessary for the dev server. used mainly for serving purpose(CDN, etc). 
    publicPath: config.publicPath
  }
})