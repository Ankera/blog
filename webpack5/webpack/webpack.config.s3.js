const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const OptionCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const bootstrap = path.join(
  __dirname,
  'node_modules/bootstrap/dist/css/bootstrap.css'
)

// 区分开发环境和线上环境
const isProd = 'prod'

module.exports = {
  entry: {
    main: './src/index2.js',
    vendor: ['lodash'],
  },
  output: {
    path: path.resolve(__dirname, 'dist3'),
    filename: '[name].[hash].js',
    // 优化⑩②】支持构建清除
    clean: true,
  },
  // 【优化⑩④】- ② 缓存打包
  // webpack 5 默认是缓存到内存中
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
  },
  devtool: false,
  mode: 'development',
  // 【优化①】打包使用的目标
  target: 'web',
  // 在模块里找依赖时有效
  resolve: {
    // 【优化②】
    // .json 配置在最后，不常用，按照顺序匹配的
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

    // 【优化③】
    // 配置别名可以加快查找速度
    alias: {
      bootstrap,
    },

    // 【优化④】
    // 配置 target === 'web' ，确定我们打包使用的是浏览器，默认顺序
    mainFields: ['browser', 'module', 'main'],
  },
  // 只用来找 loader 时有效
  resolveLoader: {
    // 类似 resolve
  },
  optimization: {
    // 【优化⑧】
    /**
     * 压缩js
     * 前：asset main.js 175 KiB [compared for emit]
     * 后：asset main.js 59.9 KiB [emitted] [minimized]
     */
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],

    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },
  module: {
    // 配置那些模块的内容不需要进行解析
    // 不去分析这些模块依赖，不可能有依赖，所以不用把它转译成ast语法树
    noParse: /lodash|jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 【优化⑩③】 多进程打包
          /**
           * 开启子进程去打包
           */
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              // 【优化⑩④】- ① 缓存打包
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 【优化⑥】
          /**
           * css 单独打包一个文件，配合 plugins 使用
           */
          isProd === 'prod' ? MinCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      // {
      //   // 【优化⑦】
      //   /**
      //    * 图片分类
      //    */
      //   /**
      //    * asset 在导出一个 data URI 和发送一个单独的文件之间做自动选择，
      //    */
      //   test: /\.(jpg|png|git)$/,
      //   // type: 'asset/resource',
      //   type: 'asset',

      //   generator: {
      //     filename: 'images/[hash][ext]',
      //   },
      // },
      // 【优化⑦】
      {
        test: /.png$/,
        type: 'asset/resource', // 导出文件 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现
      },
      {
        test: /.icon$/,
        type: 'asset/inline', // 导出 base64 导出一个资源的 data URI。之前通过使用 url-loader 实现
      },
      {
        test: /.txt$/,
        type: 'asset/source', // 导出原文件 导出资源的源代码。之前通过使用 raw-loader 实现
      },
      {
        test: /.jpg$/,
        type: 'asset',
        parser: {
          dataUrlConditiion: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    // 【优化⑩】
    /**
     * 压缩空额
     * 去掉注释
     */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new webpack.IgnorePlugin({
      // 【优化⑤】
      /**
       * 忽略那个模块
       * moment 模块下有个 local 文件，里面是世界各国不同语言的 js 文件
       * 正常开发，一般只引用 《中文》语言包、《英语》语言包，其余都是 忽略的
       *
       * 需要时手动引入，一般全局引入一次就可以了
       *
       * 对比前后
       *  前：asset main.js 1020 KiB [emitted] (name: main)
       *  后：asset main.js 469 KiB [emitted] (name: main)
       */
      contextRegExp: /moment$/,
      resourceRegExp: /locale/,
    }),
    new MinCssExtractPlugin({
      filename: 'styes/[name].[contenthash].css',
    }),
    // 【优化⑨】
    /**
     * 压缩 css
     * 前：asset styes/main.css 233 KiB [emitted]
     * 后：asset styes/main.css 189 KiB [emitted]
     */
    new OptionCssAssetsWebpackPlugin(),

    // 【优化 ⑩①】
    // https://www.cnblogs.com/llcdbk/p/16613092.html
    // 把项目中没有用到的css全部清除
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve('src')}/**/*`, { nodir: true }),
    }),

    new webpack.ProgressPlugin(),
  ],
}

/**
 styes/main.32f89b9fe4576ab765d5.css
 styes/main.32f89b9fe4576ab765d5.css
 */
