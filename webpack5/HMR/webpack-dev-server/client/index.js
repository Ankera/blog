const hotEmitter = require('../../webpack/hot/emitter.js')
// const io = require('socket.io')

const socket = io()

var currentHash

socket.on('hash', (hash) => {
  console.log('发送给客户端hash', hash)
  currentHash = hash
})

socket.on('ok', () => {
  console.log('发送给客户端ok')

  reloadApp()
})

function reloadApp() {
  hotEmitter.emit('webpackHotUpdate', currentHash)
}
