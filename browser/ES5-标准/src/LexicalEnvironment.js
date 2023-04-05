/**
 * 词法环境由一个环境记录项和一个外部词法记录的引用组成
 */
class LexicalEnvironment {
  constructor(environmentRecord, outer) {
    this.environmentRecord = environmentRecord
    this.outer = outer
  }

  createBinding(N) {
    this.environmentRecord.bindings[N] = undefined
  }

  setBinding(N, V) {
    this.environmentRecord.bindings[N] = V
  }

  hasBinding(N) {
    return N in this.environmentRecord.bindings
  }

  getBindingValue(N) {
    return this.environmentRecord.bindings[N]
  }
}

module.exports = LexicalEnvironment
