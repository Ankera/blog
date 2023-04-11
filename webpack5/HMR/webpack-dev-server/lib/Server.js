const express = require('express')
const http = require('http')
const updateCompiler = require('./utils/updateCompiler')
const webpackDevMiddleware = require('../../webpack-dev-middleware')
const io = require('socket.io')

class Server {
  constructor(compiler, devServerArgs) {
    this.sockets = []
    this.compiler = compiler
    this.devServerArgs = devServerArgs
    updateCompiler(compiler)
    this.setupHooks()
    this.setupApp()
    this.routes()
    this.setupDevMiddleware()
    this.createServer()
    this.createSocketServer()
  }

  createSocketServer() {
    const webSocketServer = io(this.server)
    // 监听客户端连接
    webSocketServer.on('connection', (socket) => {
      console.log('一个新的websocket客户端已经连接上来了')
      this.sockets.push(socket)

      socket.on('disconnect', () => {
        const index = this.sockets.indexOf(socket)
        this.sockets.splice(index, 1)
      })

      if (this._stats) {
        socket.emit('hash', this._stats.hash)
        // =================================================================
        socket.emit('ok')
      }
    })
  }

  setupHooks() {
    this.compiler.hooks.done.tap('webpack-dev-server', (stats) => {
      console.log('新的编译完成=====', stats.hash, this.sockets.length)
      this.sockets.forEach((socket) => {
        socket.emit('hash', stats.hash)
        socket.emit('ok')
      })
      this._stats = stats
    })
  }

  setupDevMiddleware() {
    this.middleware = webpackDevMiddleware(this.compiler)
    this.app.use(this.middleware)
  }

  routes() {
    if (this.devServerArgs.static.directory) {
      this.app.use(express.static(this.devServerArgs.static.directory))
    }
  }

  setupApp() {
    this.app = express()
  }

  createServer() {
    this.server = http.createServer(this.app)
  }

  listen(port, host, callback) {
    this.server.listen(port, host, callback)
  }
}

module.exports = Server
