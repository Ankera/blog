class ExecutionContext {
  constructor(lexicalEnvironment, thisBinding) {
    /**
     * 以前没有分成两个对象
     *
     * 后面是为了支持 es6 let const
     * variableEnvironment 存放 var function 声明的变量
     * lexicalEnvironment 存放 let const 声明的变量
     */
    this.variableEnvironment = this.lexicalEnvironment = lexicalEnvironment
    this.thisBinding = thisBinding
  }
}

module.exports = ExecutionContext
