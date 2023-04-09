class ExceutionContextStack {
  constructor() {
    this.exceutionContexts = []
  }

  push(exceutionContext) {
    this.exceutionContexts.push(exceutionContext)
  }

  pop() {
    this.exceutionContexts.pop()
  }

  get current() {
    return this.exceutionContexts[this.exceutionContexts.length - 1]
  }
}

module.exports = ExceutionContextStack
