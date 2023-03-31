class Hook {
  constructor(args) {
    this.args = args

    // 收集事件函数 [{type: 'sync', fn, name: '1}]
    this.taps = []

    // [fn]
    this._x = null

    this.call = CALL_DELEGATE

    this.callAsync = CALL_ASYNC_DELEGATE

    this.promise = PROMISE_DELEGATE

    this.interceptors = []
  }

  intercept(interceptor) {
    this.interceptors.push(interceptor)
  }

  tap(options, fn) {
    this._tap('sync', options, fn)
  }

  tapAsync(options, fn) {
    this._tap('async', options, fn)
  }

  tapPromise(options, fn) {
    this._tap('promise', options, fn)
  }

  _tap(type, options, fn) {
    if (typeof options === 'string') {
      options = { name: options }
    }

    let tapInfo = { ...options, type, fn }

    this._runRegisterInterceptors(tapInfo)
    this._insert(tapInfo)
  }

  _insert(tapInfo) {
    let before
    if (typeof tapInfo.before === 'string') {
      before = new Set([tapInfo.before])
    } else if (Array.isArray(tapInfo.before)) {
      before = new Set(tapInfo.before)
    }

    let stage = 0
    if (typeof tapInfo.stage === 'number') {
      stage = tapInfo.stage
    }

    let i = this.taps.length
    while (i > 0) {
      i--

      const x = this.taps[i]
      this.taps[i + 1] = x
      const xStage = x.stage || 0

      if (before) {
        if (before.has(x.name)) {
          before.delete(x.name)
          continue
        }
        if (before.size > 0) {
          continue
        }
      }

      if (xStage > stage) {
        continue
      }
      i++
      break
    }

    this.taps[i] = tapInfo

    // this.taps.push(tapInfo)
  }

  compile() {
    throw new Error('抽象方法，之类实现')
  }

  _runRegisterInterceptors(tapInfo) {
    for (const interceptor of this.interceptors) {
      if (interceptor.register) {
        interceptor.register(tapInfo)
      }
    }
  }

  _createCall(type) {
    // this._x = this.taps.map((tap) => tap.fn)
    return this.compile({
      type,
      taps: this.taps,
      args: this.args,
      interceptors: this.interceptors,
    })
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

function PROMISE_DELEGATE(...args) {
  this.promise = this._createCall('promise')
  return this.promise(...args)
}

module.exports = Hook
