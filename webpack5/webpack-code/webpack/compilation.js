const path = require('path').posix
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const { SyncHook } = require('tapable')

const baseDir = toUnixPath(process.cwd())

function toUnixPath(filePath) {
  return filePath.replace(/\\/g, '/')
}

class Compilation {
  constructor(options) {
    this.options = options
    // 当前编译依赖的文件
    this.fileDependencies = []
    // 本次编译的所有模块
    this.modules = []
    // 里面放置所有的代码块
    this.chunks = []
    this.assets = []
    this.hooks = {
      chunkAsset: new SyncHook(['chunk', 'filename']),
    }
  }

  build = (onCompiled) => {
    // 5、根据配置中的 entry 找出入口文件
    let entry = {}
    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }

    for (const entryName in entry) {
      // 获取到了所有入口文件的绝对路径
      const entryPath = path.join(baseDir, entry[entryName])

      this.fileDependencies.push(entryPath)

      // 6、从入口文件出发，调用所有配置的 loader 对模块进行编译
      const entryModule = this.buildModule(entryName, entryPath)

      // 8、根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk
      const chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter((module) =>
          module.names.includes(entryName)
        ),
      }

      this.chunks.push(chunk)
    }

    // 9、再把每个 chunk 转换成一个单独的文件加入到输出列表
    this.chunks.forEach((chunk) => {
      const filename = this.options.output.filename.replace(
        '[name]',
        chunk.name
      )
      this.hooks.chunkAsset.call(chunk, filename)
      this.assets[filename] = getSource(chunk)
    })

    onCompiled(
      null,
      {
        module: this.modules,
        chunks: this.chunks,
        assets: this.assets,
      },
      this.fileDependencies
    )
  }

  /**
   * 编译模块
   * @param {*} name 入口的名称
   * @param {*} modulePath 模块的路径
   */
  buildModule = (name, modulePath) => {
    const _this = this

    // ① 读取源代码的内容
    let sourceCode = fs.readFileSync(modulePath, 'utf8')
    // ② 调用此模块需要使用的loader
    const { rules } = this.options.module
    const loaders = []
    rules.forEach((rule) => {
      if (modulePath.match(rule.test)) {
        loaders.push(...rule.use)
      }
    })

    sourceCode = loaders.reduceRight((code, loader) => {
      return require(loader)(code)
    }, sourceCode)

    // src/entry1.js src/entry2.js
    const moduleId = './' + path.relative(baseDir, modulePath)

    /**
     * 创建一个模块对象，
     * id moduleId是相对于根目录的相对路径
     * dependencies 表示此模块依赖的模块
     * names  表示此模块添加了那几个入口依赖
     */
    const module = {
      id: moduleId,
      dependencies: [],
      names: [name],
    }

    // 获取当前路径所在的路径
    const dirName = path.dirname(modulePath)
    const extensions = this.options.resolve.extensions

    // 7、再找出该模块依赖的模块，在递归本步骤（buildModule），知道所有依赖入口文件加载完
    const ast = parser.parse(sourceCode, { sourceType: 'module' })
    traverse(ast, {
      CallExpression({ node }) {
        if (node.callee.name === 'require') {
          const depModuleName = node.arguments[0].value // '.title'

          // 获取依赖路径的绝对路径
          let depModulePath = path.join(dirName, depModuleName)

          depModulePath = tryExtensions(depModulePath, extensions)

          // 把此依赖文件添加到依赖数组里面，当文件发生变化了，会重新编译文件，创建一个新的 Compilation
          _this.fileDependencies.push(depModulePath)

          const depModuleId = './' + path.relative(baseDir, depModulePath)

          // 修改 ast 语法树，把 require 方法的参数变成依赖的模块 ID
          node.arguments = [types.stringLiteral(depModuleId)]

          module.dependencies.push({
            depModuleId,
            depModulePath,
          })
        }
      },
    })

    const { code } = generator(ast)
    module._source = code

    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      const buildModule = _this.modules.find(
        (module) => module.id === depModuleId
      )
      if (buildModule) {
        buildModule.names.push(name)
      } else {
        const depModule = _this.buildModule(name, depModulePath)
        _this.modules.push(depModule)
      }
    })

    return module
  }
}

/**
 * 尝试给当前的路径添加扩展名，直到找到文件为止
 */
function tryExtensions(modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath
  }

  for (let i = 0; i < extensions.length; i++) {
    const filePath = modulePath + extensions[i]
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }

  throw new Error(`找不到${modulePath}`)
}

function getSource(chunk) {
  return `
    (() => {
      var modules = {
        ${chunk.modules.map(
          (module) => `
          "${module.id}": (module) => {
            ${module._source}
          }
        `
        )}
      }
      var cache = {};
      function require(moduleId) {
        var cachedModule = cache[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        var module = cache[moduleId] = {
          exports: {}
        };
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }

      var exports = {};
      ${chunk.entryModule._source}
    })();
  `
}

module.exports = Compilation
