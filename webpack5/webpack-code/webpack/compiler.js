const { SyncHook } = require('tapable');
const path  = require('path');
const fs = require('fs');
const Compilation = require('./compilation');

/**
 * 代表整个编译对象，负责整个编译的过程，里面会保存所有编译的配置对象
 */
class Compiler {
  constructor(options) {
    this.options = options;

    // 保存当前 Compiler 上面所有的钩子
    this.hooks = {
      // 开始编译时触发
      run: new SyncHook(),
      // 编译结束时触发
      done: new SyncHook(),
      compilation: new SyncHook(['chunk', 'filename'])
    }
  }

  run = (callback) => {
    // ①、开始编译
    this.hooks.run.call();

    const _this = this;
    function onCompiled(err, stats, fileDependencies){
      // 10、在确定好输出内容后，根据配置确定输出的路径和文件名，把文件写入到文件系统
      for (const filename in stats.assets) {
        const filePath = path.join(_this.options.output.path, filename);
        fs.writeFileSync(filePath, stats.assets[filename], 'utf8');
      }

      callback(null, {
        toJson: () => {
          return stats;
        }
      })

      fileDependencies.forEach((fileDependencie) => {
        fs.watch(fileDependencie, () => {
          _this.compile(onCompiled);
        })
      })
    }

    // ②、编译过程
    this.compile(onCompiled);

    // ③、结束编译
    this.hooks.done.call();
  }

  compile = (onCompiled) => {
    // 每次开启一次新的编译，都会创建一个新的 Compilation 类的实例
    const compilation = new Compilation(this.options);

    this.hooks.compilation.call(compilation)

    compilation.build(onCompiled);
  }
}

module.exports = Compiler;

// 19 课时