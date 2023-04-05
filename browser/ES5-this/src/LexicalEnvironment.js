/**
 * 作用域 = 词法环境
 *
 * 变量环境，词法环境
 */
class LexicalEnvironment {
  /**
   * @param {string} environmentRecords
   * @param {string} outer 外部词法环境
   */
  constructor(environmentRecords, outer) {
    this.environmentRecords = environmentRecords
    this.outer = outer
  }

  // static
}

module.exports = LexicalEnvironment
