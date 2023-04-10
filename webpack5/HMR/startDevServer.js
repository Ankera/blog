const webpack = require('webpack')
const config = require('./webpack.config.js')
const Server = require('./webpack-dev-server/lib/Server')

function startDevServer(compiler, config) {
  const devServerArgs = config.devServer || {}
  const server = new Server(compiler, devServerArgs)
  const { port, host } = devServerArgs

  server.listen(port, host, (err) => {
    console.log('server success')
  })
}

const compiler = webpack(config)

startDevServer(compiler, config)

module.exports = startDevServer
