const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: false,
  mode: 'development',
  devServer: {
    hot: true,
    port: 7070,
    host: 'localhost',
    static: {
      directory: path.join(__dirname, 'static'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HotModuleReplacementPlugin(),
  ],
}
