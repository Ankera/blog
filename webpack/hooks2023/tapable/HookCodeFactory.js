class HookCodeFactory {
  setup(hook, options) {
    hook._x = options.taps.map((tap) => tap.fn)
  }

  init(options) {
    this.options = options
  }

  deInit() {
    this.options = null
  }

  args(options = {}) {
    const { before, after } = options
    let allArgs = this.options.args
    if (before) {
      allArgs = [before, ...allArgs]
    }
    if (after) {
      allArgs = [...allArgs, after]
    }
    return allArgs.join(',')
  }

  header() {
    let code = ''
    code += 'var _x = this._x;\n'
    const interceptors = this.options.interceptors

    if (interceptors.length > 0) {
      code += `var _taps = this.taps;\n`
      code += `var _interceptors = this.interceptors\n`
      for (let i = 0; i < interceptors.length; i++) {
        const interceptor = interceptors[i]
        if (interceptor.call) {
          code += `_interceptors[${i}].call(${this.args()});\n`
        }
      }
    }
    // console.log(code)
    return code
  }

  content() {
    throw new Error('抽象方法，之类实现')
  }

  /**
   * @param {Object} options
   *  type 注册类型 sync async
   *  args 参数
   *  taps tapInfo
   */
  create(options) {
    this.init(options)
    const { type } = options
    let fn
    switch (type) {
      case 'sync':
        fn = new Function(this.args(), this.header() + this.content())
        break
      case 'async':
        fn = new Function(
          this.args({ after: '_callback' }),
          this.header() + this.content({ onDone: () => `_callback();\n` })
        )
      case 'promise':
        const taps = this.options.taps
        const tapsContent = this.content({ onDone: () => `_resolve();\n` })
        let content = `
          return new Promise(function(_resolve) {
            ${tapsContent}
          });
        `
        fn = new Function(this.args(), this.header() + content)
      default:
        break
    }
    // console.log(fn.toString())
    return fn
  }

  callTapsSeries() {
    const taps = this.options.taps
    if (taps.length === 0) {
      return ''
    }
    let code = ''
    for (let i = 0; i < taps.length; i++) {
      const content = this.callTap(i)
      code += content
    }
    return code
  }

  callTapsParalle({ onDone }) {
    const taps = this.options.taps
    const type = this.options.type
    if (taps.length === 0) {
      return ''
    }

    let code = `
      var _counter = ${taps.length};
      var _done = (function(){ ${onDone()} })
    `

    for (let i = 0; i < taps.length; i++) {
      const content = this.callTap(i)
      code += content
    }

    return code
  }

  callTap(tapIndex) {
    let code = ''

    const interceptors = this.options.interceptors

    if (interceptors.length > 0) {
      code += `_tap${tapIndex} = _taps[${tapIndex}];\n`
      for (let i = 0; i < interceptors.length; i++) {
        const interceptor = interceptors[i]
        if (interceptor.tap) {
          code += `_interceptors[${i}].tap(${this.args()});\n`
        }
      }
    }

    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`
    const tapInfo = this.options.taps[tapIndex]

    switch (tapInfo.type) {
      case 'sync':
        code += `_fn${tapIndex}(${this.args()});\n`
        return code
      case 'async':
        code += `
        _fn${tapIndex}(${this.args()}, function(){
          if(--_counter === 0){ _done() };
        })
        `
        return code
      case 'promise':
        code += `
        var _promise${tapIndex} = _fn${tapIndex}(${this.args()})
        _promise${tapIndex}.then(function(){
          if(--_counter === 0){ _done() };
        })
        `
        return code
      default:
        return ''
    }

    return code
  }
}

module.exports = HookCodeFactory

// var _x = this._x

// return new Promise(function (_resolve) {
//   var _counter = 3
//   var _done = function () {
//     _resolve()
//   }
//   var _fn0 = _x[0]

//   var _promise0 = _fn0(names)
//   _promise0.then(function () {
//     if (--_counter === 0) {
//       _done()
//     }
//   })
//   var _fn1 = _x[1]

//   var _promise1 = _fn1(names)
//   _promise1.then(function () {
//     if (--_counter === 0) {
//       _done()
//     }
//   })
//   var _fn2 = _x[2]

//   var _promise2 = _fn2(names)
//   _promise2.then(function () {
//     if (--_counter === 0) {
//       _done()
//     }
//   })
// })
