const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutoExternalPlugin = require('./plugins/auto-external-plugin')

module.exports = {
  entry: './src/index2.js',
  output: {
    path: path.resolve(__dirname, 'dist2'),
    filename: '[name].js',
  },
  devtool: false,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: {
              // chrome 92
              // 可能会污染全局，但是代码体积小
              browsers: ['last 2 versions'],
            },
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  corejs: { version: 3 },
                },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
}
