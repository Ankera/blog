class ECStack {
  constructor() {
    this.context = []
  }

  push(EC) {
    this.context.push(EC)
  }

  pop() {
    this.context.pop()
  }

  // 栈顶，运行中的执行上下文
  get current() {
    return this.context[this.context.length - 1]
  }
}

module.exports = new ECStack()
