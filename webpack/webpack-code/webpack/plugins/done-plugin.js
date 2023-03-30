class DonePlugin {
  // 应用此插件
  apply(compiler){
    compiler.hooks.done.tap('DonePlugin', () => {
      console.log('========结束编译========')
    });

    compiler.hooks.compilation.tap('Compilation', (compilation) => {
      compilation.hooks.chunkAsset.tap('Asset', (chunk, filename) => {
        console.log('chunk', chunk.name, filename)
      })
    })
  }
}

module.exports = DonePlugin;