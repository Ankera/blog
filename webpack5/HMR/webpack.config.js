const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

// https://juejin.cn/post/7021729340945596424

module.exports = {
  entry: [
    path.resolve(__dirname, 'webpack-dev-server/client/index.js'),
    path.resolve(__dirname, 'webpack/hot/dev-server.js'),
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    hotUpdateGlobal: 'webpackHotUpdate',
  },
  devtool: false,
  mode: 'development',
  devServer: {
    // hot: true,
    port: 7070,
    host: 'localhost',
    static: {
      directory: path.resolve(__dirname, 'static'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HotModuleReplacementPlugin(),
  ],
}
