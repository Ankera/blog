const ECStack = require('./src/ECStack')
const LexicalEnvironment = require('./src/LexicalEnvironment')
const ExecutionContext = require('./src/ExecutionContext')
const FunctionDeclaration = require('./src/FunctionDeclaration')

let thisArg = global

const globalLexicalEnvironment = LexicalEnvironment.NewObjectEnvironment(
  thisArg,
  null
)

const globalEC = new ExecutionContext(globalLexicalEnvironment, thisArg)

// 把全局执行上下文入栈
ECStack.push(globalEC)

let env = ECStack.current.lexicalEnvironment.environmentRecords

let configuralbeBindings = false

// ========================== 开始编译 ==========================
let strict = false

let dn = 'a'

let varAlreadyBindings = env.HasBinding(dn)

if (!varAlreadyBindings) {
  env.CreateMutableBinding(dn, configuralbeBindings)
  env.SetMutableBinding(dn, undefined, strict)
}

let fn = 'one'

let FormalParameterList = 'c'

let FunctionBody = `
  var b = 2
  console.log(a, b, c)
`

let Scope = ECStack.current.lexicalEnvironment

strict = false

let fo = FunctionDeclaration.newInstance(
  fn,
  FormalParameterList,
  FunctionBody,
  Scope,
  strict
)

varAlreadyBindings = env.HasBinding(fn)

if (!varAlreadyBindings) {
  env.CreateMutableBinding(fn, configuralbeBindings)
} else {
  let go = global
  let existingProp = Object.getOwnPropertyDescriptor(go, fn)
  if (existingProp.configurable) {
    Object.defineProperty(global, fn, {
      value: undefined,
      writable: false,
      enumerable: false,
      configurable: false,
    })
  }
}

env.SetMutableBinding(fn, fo, strict)

// console.log(env.HasBinding(fn))
// console.log(env.GetMutableBinding(fn, strict))

// ========================== 结束编译 ==========================

// ========================== 开始执行 ==========================

env.SetMutableBinding(dn, '1')

let F = fo

// console.log(env.GetMutableBinding(dn))
thisArg = global

let localEnv = LexicalEnvironment.NewDeclarativeEnvironment(F[`[[Scope]]`])

let oneEc = new ExecutionContext(localEnv, thisArg)

ECStack.push(oneEc)

// 再次获得one 的词法环境
env = ECStack.current.lexicalEnvironment.environmentRecords

let code = F[`[[Code]]`]

console.log(code)

// ========================== 结束执行 ==========================
