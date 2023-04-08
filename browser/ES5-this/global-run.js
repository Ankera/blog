const ECStack = require('./src/ECStack')
const LexicalEnvironment = require('./src/LexicalEnvironment')
const ExecutionContext = require('./src/ExecutionContext')
const FunctionDeclaration = require('./src/FunctionDeclaration')
const CreateArgumentsObject = require('./src/CreateArgumentsObject')
const Reference = require('./src/Reference')

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

dn = 'b'

varAlreadyBindings = env.HasBinding(dn)

if (!varAlreadyBindings) {
  env.CreateMutableBinding(dn, configuralbeBindings)
  env.SetMutableBinding(dn, undefined, strict)
}

let func = F
let names = func[`[[FormalParameters]]`]

let args = [3]

let argCount = args.length

let n = 0

names.forEach((argName) => {
  n += 1
  let v = n > argCount ? undefined : args[n - 1]
  let argAlreadyDeclared = env.HasBinding(argName)
  if (!argAlreadyDeclared) {
    env.CreateMutableBinding(argName)
  }
  env.SetMutableBinding(argName, v, strict)
})

let argumentsAlreadyDeclared = env.HasBinding('arguments')

if (!argumentsAlreadyDeclared) {
  let argsObj = CreateArgumentsObject(fn, names, args, env, strict)
  if (strict) {
    env.CreateImmutalbeBinding('arguments')
    env.InitializeImmutalbeBinding('arguments', argsObj)
  } else {
    env.CreateMutableBinding('arguments')
    env.SetMutableBinding('arguments', argsObj)
  }
}

env.SetMutableBinding('b', '2')

const referenceA = LexicalEnvironment.GetIdentifierReference(
  ECStack.current.lexicalEnvironment,
  'a',
  strict
)

const referenceB = LexicalEnvironment.GetIdentifierReference(
  ECStack.current.lexicalEnvironment,
  'b',
  strict
)

const referenceC = LexicalEnvironment.GetIdentifierReference(
  ECStack.current.lexicalEnvironment,
  'c',
  strict
)

console.log(
  Reference.GetValue(referenceA),
  Reference.GetValue(referenceB),
  Reference.GetValue(referenceC)
)
// ========================== 结束执行 ==========================
