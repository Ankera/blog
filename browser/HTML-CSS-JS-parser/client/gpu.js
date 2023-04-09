const EventEmitter = require('events')

class Gpu extends EventEmitter {
  constructor() {
    super()

    // 最终会把生成的位图保存在GPU内存中
    this.bitMaps = []
  }
}

const gpu = new Gpu()

module.exports = gpu
