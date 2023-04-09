const ExceutionContext = require('./ExceutionContext')
const LexicalEnvironment = require('./LexicalEnvironment')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')
const ExceutionContextStack = require('./ExceutionContextStack')
const FunctionInstance = require('./FunctionInstance')

const ECStack = new ExceutionContextStack()

// ================== 1 全局准备阶段 ==================
// 全局环境记录
const globalEnvironmentRecords = new ObjectEnvironmentRecords(global)

// 全局词法环境
const globalLexicalEnvironment = new LexicalEnvironment(
  globalEnvironmentRecords,
  null
)

// global.xx = 'xx'

// console.log(
//   'globalLexicalEnvironment',
//   globalLexicalEnvironment.getBindingValue('xx')
// )

// 全局执行上下文
const globalExceutionContext = new ExceutionContext(
  globalLexicalEnvironment,
  global
)

ECStack.push(globalExceutionContext)

// ================== 2 进入全局编译阶段 ==================

ECStack.current.lexicalEnvironment.createBinding('a')

ECStack.current.lexicalEnvironment.setBindings('a', undefined)

// 函数的作用域是静态作用域，是在哪里定义决定的
let oneFn = new FunctionInstance(
  'one',
  ' var b = 2; console.log(a, b)',
  ECStack.current.lexicalEnvironment
)

ECStack.current.lexicalEnvironment.createBinding('one')
ECStack.current.lexicalEnvironment.setBindings('one', oneFn)

// ================== 3 执行全局代码 ==================
ECStack.current.lexicalEnvironment.setBindings('a', 1)

let oneLexicalEnvironment = LexicalEnvironment.NewDeclarativeEnvironment(
  oneFn.scope
)

let oneExceutionContext = new ExceutionContext(oneLexicalEnvironment, global)

ECStack.push(oneExceutionContext)

// ================== 4 开始one的编译阶段 ==================
ECStack.current.lexicalEnvironment.createBinding('b')

ECStack.current.lexicalEnvironment.setBindings('b', undefined)

// ================== 5 开始one的执行阶段 ==================
ECStack.current.lexicalEnvironment.setBindings('b', 2)

console.log(
  ECStack.current.lexicalEnvironment.GetIdentifierReference('a'),
  ECStack.current.lexicalEnvironment.GetIdentifierReference('b')
)

ECStack.pop()
