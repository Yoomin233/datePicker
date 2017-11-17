const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      './src/main.js'
    ],
  },
  cache: true,
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    // unnecessary for the dev server. used mainly for serving purpose(CDN, etc). 
    publicPath: '/'
  },
  devServer: {
    // server files from which directory(in this example, localhost:8080 => ./)
    contentBase: './src',
    historyApiFallback: true,
    // reload the entire page if file change(but will try hmr first if 'hot' enabled, else, reload the page directly)
    hot: true,
    // dont refresh page if module can not be accepted
    hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, './src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test:/\.png$/,
        loader: 'url-loader',
        query: {
          limit: 1024
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'title defined in htmlWebpackPlugin',
      // favicon: __dirname + '/favicon.png',
      template: __dirname + '/src/index.html',
      filename: './index.html',
      chunks: ['main']
    }),
  ]
}