const hotEmitter = require('../../webpack/hot/emitter.js')

hotEmitter.on('webpackHotUpdate', (currentHash) => {
  console.log('dev-server 收到了最新的hash值', currentHash)
})
