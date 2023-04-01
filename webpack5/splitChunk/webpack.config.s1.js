/**
 * 代码分割
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    page3: './src/page3.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist1'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      // /**
      //  * all = async + initial
      //  *
      //  * async  只分割 import(/* webpackChunkName: "asyncModule" */ './asyncModule1')
      //  *
      //  * initial 只分割 const module1 = require('./module1')
      //  */
      chunks: 'all',

      // 生产 chunk 的最小体积（以 bytes 为单位），分割出去的代码最小体积，0是不限制
      minSize: 0,

      /**
       * 拆分前必须共享模块的最小
       * moudle1 被page1、page2、page3引用，是3
       * moudle2 被page1、page3引用，是2
       */
      minChunks: 1,

      /**
       * 缓存组可以继承或者覆盖 splitChunks.* 如何选项
       * 缓存组是用来指定代码块分割的条件，哪些模块应该被提取到哪些代码块中
       */
      cacheGroups: {
        // 默认第三方缓存组
        defaultVendors: {
          test: /[\\]node_modules[\\]/,
          priority: -10,
        },
        default: {
          // 会覆盖上面的 minChunks: 1
          // 个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）。
          minChunks: 2,
          priority: -20,
        },
        module3: {
          test(m) {
            return m.resource && m.resource.endsWith('module3.js')
          },
          name(m, chunks, cacheGroupsKey) {
            const moduleFileName = m
              .identifier()
              .split('/')
              .reduceRight((a) => a)

            const allChunksNames = chunks.map((chunk) => chunk.name)
            console.log(
              'allChunksNames',
              allChunksNames,
              cacheGroupsKey,
              moduleFileName
            )
            return m.resource && m.resource.endsWith('module3.js')
          },
          // priority: -100,
        },
      },
    },
  },
  plugins: [
    /**
     * 三个独立的页面
     */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'page1.html',
      chunks: ['page1'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'page2.html',
      chunks: ['page2'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'page3.html',
      chunks: ['page3'],
    }),
  ],
}
