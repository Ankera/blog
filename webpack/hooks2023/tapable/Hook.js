class Hook {
  constructor(args) {
    this.args = args

    // 收集事件函数 [{type: 'sync', fn, name: '1}]
    this.taps = []

    // [fn]
    this._x = null

    this.call = CALL_DELEGATE

    this.callAsync = CALL_ASYNC_DELEGATE
  }

  tap(options, fn) {
    this._tap('sync', options, fn)
  }

  tapAsync(options, fn) {
    this._tap('async', options, fn)
  }

  _tap(type, options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }

    let tapInfo = { ...options, type, fn }

    this._insert(tapInfo)
  }

  _insert(tapInfo) {
    this.taps.push(tapInfo)
  }

  compile() {
    throw new Error('抽象方法，之类实现')
  }

  _createCall(type) {
    // this._x = this.taps.map((tap) => tap.fn)
    return this.compile({ type, taps: this.taps, args: this.args })
  }
}

function CALL_DELEGATE(...args) {
  this.call = this._createCall('sync')
  return this.call(...args)
}

function CALL_ASYNC_DELEGATE(...args) {
  this.callAsync = this._createCall('async')
  return this.callAsync(...args)
}

module.exports = Hook
