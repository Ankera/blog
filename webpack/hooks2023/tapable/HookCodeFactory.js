class HookCodeFactory {
  setup(hook, options) {
    console.log('hook', hook)
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
          this.header() + this.content()
        )
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

  callTapsParalle() {
    const taps = this.options.taps
    if (taps.length === 0) {
      return ''
    }

    let code = `
      var _counter = ${taps.length};
      var _done = (function(){ _callback(); })
    `

    for (let i = 0; i < taps.length; i++) {
      const content = this.callTap(i)
      code += content
    }
    return code
  }

  callTap(tapIndex) {
    let code = ''
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
      default:
        return ''
    }
    return code
  }
}

module.exports = HookCodeFactory
