class FunctionDeclaration {
  static newInstance(fn, FormalParameterList, FunctionBody, Scope, Strict) {
    let F = { name: fn }

    F[`[[Class]]`] = 'Function'

    F[`[[Prototype]]`] = Function.prototype

    F[`[[Scope]]`] = Scope

    let names = FormalParameterList.split(',') // 'c,d' [c,d]

    F[`[[FormalParameters]]`] = names

    F[`[[Code]]`] = FunctionBody

    F[`[[Extensible]]`] = true

    let len = names.length
    Object.defineProperty(F, 'length', {
      value: len,
      writable: false,
      enumerable: false,
      configurable: false, // 不可删除
    })

    let proto = new Object()

    Object.defineProperty(proto, 'constructor', {
      value: F,
      writable: false,
      enumerable: false,
      configurable: false,
    })

    Object.defineProperty(F, 'prototype', {
      value: proto,
      writable: false,
      enumerable: false,
      configurable: false,
    })

    return F
  }
}

module.exports = FunctionDeclaration
