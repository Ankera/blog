class RunPlugin {
  // 应用此插件
  apply(compiler){
    compiler.hooks.run.tap('RunPlugin', () => {
      console.log('========开始编译========')
    });
  }
}

module.exports = RunPlugin;