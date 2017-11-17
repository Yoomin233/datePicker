const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/main.js',
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
    inline: true,
    hot: true
  },
  module: {
    rules: [
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
    new webpack.NamedModulesPlugin()
  ]
}