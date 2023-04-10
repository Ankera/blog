const MemoryFileSystem = require('memory-fs')
const fs = require('fs')
const middleware = require('./middleware')

const memoryFileSystem = new MemoryFileSystem()

function webpackDevMiddleware(compiler) {
  compiler.watch({}, () => {
    console.log('监听到文件变化，webpack重新编译')
  })

  // 产出的文件是放在内存中

  // let fs = (compiler.outputFileSystem = memoryFileSystem)
  return middleware({
    fs,
    outputPath: compiler.options.output.path,
  })
}

module.exports = webpackDevMiddleware
