const EnvironmentRecords = require('./EnvironmentRecords')

class DeclarativeEnvironmentRecords extends EnvironmentRecords {
  HasBinding(N) {
    let envRec = this
    return N in envRec
  }

  CreateMutableBinding(N, D) {
    let envRec = this
    console.assert(!this.HasBinding(N), `当前记录中已经有${N}绑定`)
    Object.defineProperty(envRec, N, {
      value: undefined,
      writable: true,
      configurable: D,
      initialiation: false,
    })
  }

  SetMutableBinding(N, V, S) {
    let envRec = this
    console.assert(this.HasBinding(N), '当前环境中尚未定义N变量')
    const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N)
    if (S && !propertyDescriptor.writable) {
      throw new Error('TypError 给一个不可变的属性赋值')
    }
    envRec[N] = V
    propertyDescriptor.initialization = true
  }

  GetMutableBinding(N, S) {
    let envRec = this
    console.assert(this.HasBinding(N), '当前环境中尚未定义N变量')
    const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N)
    if (!propertyDescriptor.initialiation) {
      if (S) {
        throw new Error('RefereceError')
      }
      return undefined
    }
    return envRec[N]
  }

  DeleteBinding(N) {
    let envRec = this
    if (!this.hasBinding(N)) {
      return true
    }
    const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N)
    if (!propertyDescriptor.configurable) {
      return false
    }
    delete envRec[N]
    return true
  }

  ImplicitThisValue() {
    return undefined
  }

  CreateImmutalbeBinding(N) {
    let envRec = this
    console.assert(!this.HasBinding(N), `当前记录中已经有${N}绑定`)
    Object.defineProperty(envRec, N, {
      value: undefined,
      writable: false,
      initialiation: false,
    })
  }

  InitializeImmutalbeBinding(N, V) {
    let envRec = this
    console.assert(this.HasBinding(N), '当前环境中尚未定义N变量')
    envRec[N] = V
    const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N)
    propertyDescriptor.initialization = true
  }
}

module.exports = DeclarativeEnvironmentRecords
