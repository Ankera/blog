const path = require('path')
const RunPlugin = require('./webpack/plugins/run-plugin')
const DonePlugin = require('./webpack/plugins/done-plugin')

module.exports = {
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js',
  },
  mode: 'development',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist2'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'webpack/loaders/logger1.js'),
          path.resolve(__dirname, 'webpack/loaders/logger2.js'),
        ],
      },
    ],
  },
  plugins: [new RunPlugin(), new DonePlugin()],
}
