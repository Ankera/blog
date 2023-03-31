const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ExternalModule } = require('webpack')

class AutoExternalPlugin {
  constructor(options) {
    this.options = options

    this.externalModules = Object.keys(this.options)

    // 存放所有用到的外部依赖
    this.importedModules = new Set()
  }

  /**
   * 1、收集依赖，需要知道项目中一共用到了哪些外部依赖模块，放到 importedModules
   * 2、拦截模块生成的流程，如果他是一个外部模块的话，就不要走原始流程，而用一个外部模块来替代
   * 3、把实际用到的模块 cdn 插入到 html 中
   */
  apply(compiler) {
    // 获取普通模块
    compiler.hooks.normalModuleFactory.tap(
      'AutoExternalPlugin',
      (normalModuleFactory) => {
        normalModuleFactory.hooks.parser
          .for('javascript/auto')
          .tap('AutoExternalPlugin', (parser) => {
            // 监听 import
            parser.hooks.import.tap(
              'AutoExternalPlugin',
              (statement, source) => {
                if (this.externalModules.indexOf(source) >= 0) {
                  this.importedModules.add(source)
                }
              }
            )

            // 监听 require
            parser.hooks.call.for('require').tap('AutoExternalPlugin', () => {
              if (this.externalModules.indexOf(source) >= 0) {
                this.importedModules.add(source)
              }
            })
          })

        normalModuleFactory.hooks.factorize.tapAsync(
          'AutoExternalPlugin',
          (resolveData, callback) => {
            const { request } = resolveData
            if (this.importedModules.has(request)) {
              const { globalVariable } = this.options[request]
              callback(
                null,
                new ExternalModule(globalVariable, 'window', request)
              )
            } else {
              callback(null)
            }
          }
        )
      }
    )

    compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'AutoExternalPlugin',
        (htmlData, callback) => {
          Reflect.ownKeys(this.options)
            .filter((key) => this.importedModules.has(key))
            .forEach((key) => {
              htmlData.assetTags.scripts.unshift({
                tagName: 'script',
                voidTag: false,
                meta: {
                  plugin: 'html-webpack-plugin',
                },
                attributes: {
                  src: this.options[key].url,
                },
              })
            })

          callback(null, htmlData)
        }
      )
    })
  }
}

module.exports = AutoExternalPlugin
