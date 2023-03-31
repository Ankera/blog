const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutoExternalPlugin = require('./plugins/auto-external-plugin')

module.exports = {
  entry: './src/index1.js',
  output: {
    path: path.resolve(__dirname, 'dist1'),
    filename: '[name].js',
  },
  devtool: false,
  mode: 'development',
  externals: {
    lodash: '-',
  },
  module: {
    rules: [],
  },
  plugins: [
    new AutoExternalPlugin({
      lodash: {
        globalVariable: '_',
        url: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
}
