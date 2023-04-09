const DeclarativeEnvironmentRecords = require('./DeclarativeEnvironmentRecords')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')

/**
 * 词法环境由 环境记录项 和 一个外部词法记录的引用组成
 */
class LexicalEnvironment {
  constructor(environmentRecord, outer) {
    this.environmentRecord = environmentRecord
    this.outer = outer
  }

  createBinding(N) {
    this.environmentRecord.createBinding(N)
  }

  setBindings(N, V) {
    this.environmentRecord.setBindings(N, V)
  }

  hasBinding(N) {
    return this.environmentRecord.hasBinding(N)
  }

  getBindingValue(N) {
    return this.environmentRecord.getBindingValue(N)
  }

  GetIdentifierReference(name) {
    let lexicalEnvironment = this
    do {
      let exists = lexicalEnvironment.hasBinding(name)
      if (exists) {
        return lexicalEnvironment.getBindingValue(name)
      } else {
        lexicalEnvironment = lexicalEnvironment.outer
      }
    } while (lexicalEnvironment)
  }

  static NewDeclarativeEnvironment(outerLexicalEnvironment) {
    let envRec = new DeclarativeEnvironmentRecords()
    let env = new LexicalEnvironment(envRec, outerLexicalEnvironment)
    return env
  }

  static NewObjectEnvironment(object, outerLexicalEnvironment) {
    let envRec = new ObjectEnvironmentRecords(object)
    let env = new LexicalEnvironment(envRec, outerLexicalEnvironment)
    return env
  }
}

module.exports = LexicalEnvironment
