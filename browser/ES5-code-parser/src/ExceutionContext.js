/**
 * 执行上下文
 */
class ExceutionContext {
  constructor(lexicalEnvironment, thisBinding) {
    this.lexicalEnvironment = lexicalEnvironment
    this.thisBinding = thisBinding
  }
}

module.exports = ExceutionContext
