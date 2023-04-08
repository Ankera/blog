const DeclarativeEnvironmentRecords = require('./DeclarativeEnvironmentRecords')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')
const Reference = require('./Reference')

/**
 * 课时19
 *
 * 作用域 = 词法环境
 *
 * 变量环境，词法环境
 *
 * 每当创建一个可执行上下文，就要创建一个词法环境
 *
 * 全局环境是一个唯一的词法环境
 *
 * 创建（编译）函数时，函数有一个隐藏[[SCOPE]]属性，该属性指向当前的词法环境
 *
 * 编译阶段就是分词，语法解析，ast等，确定作用域
 * JS执行两个阶段，创建词法环境是在执行阶段
 *
 * 一个函数在执行，变量环境只有一个
 * 在执行过程中，会不断的创建和退出词法环境，但是变量环境只有一个
 * function one(){
 *  //  创建词法环境 --- 1
 *  var a = 1;
 *  let b = 2;
 *  {
 *    // 创建词法环境 --- 2
 *    let c = 2;
 *  }
 *  // 退出 创建词法环境 --- 2
 * }
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

  static NewDeclarativeEnvironment(E) {
    const env = new LexicalEnvironment()

    const evnRec = new DeclarativeEnvironmentRecords()

    env.environmentRecords = evnRec
    env.outer = E

    return env
  }

  static NewObjectEnvironment(O, E) {
    const env = new LexicalEnvironment()

    const evnRec = new ObjectEnvironmentRecords(O)

    env.environmentRecords = evnRec
    env.outer = E

    return env
  }

  static GetIdentifierReference(lex, name, strict) {
    debugger
    if (!lex) {
      return new Reference(undefined, name, strict)
    } else {
      let envRec = lex.environmentRecords
      let exists = envRec.HasBinding(name)
      if (exists) {
        return new Reference(envRec, name, strict)
      } else {
        return LexicalEnvironment.GetIdentifierReference(
          envRec.outer,
          name,
          strict
        )
      }
    }
  }
}

module.exports = LexicalEnvironment
