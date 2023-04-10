const path = require('path')

function updateCompiler(compiler) {
  const options = compiler.options

  //1 来自 webpack-dev-server client 浏览器客户端 websocket
  options.entry.main.import.unshift(require.resolve('../../client/index.js'))

  // 2 监听
  options.entry.main.import.unshift(
    require.resolve('../../../webpack/hot/dev-server.js')
  )

  compiler.hooks.entryOption.call(options.context, options.entry)
}

module.exports = updateCompiler
