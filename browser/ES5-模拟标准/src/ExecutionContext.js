class ExecutionContext {
  constructor(lexicalEnvironment, thisBinding) {
    // 词法环境
    this.lexicalEnvironment = lexicalEnvironment
    // this 指针
    this.thisBinding = this.thisBinding
  }
}

module.exports = ExecutionContext
