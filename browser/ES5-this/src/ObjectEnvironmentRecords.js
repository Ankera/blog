const EnvironmentRecords = require('./EnvironmentRecords')

/**
 * 每一个对象式记录项都有一个关联对象，这个对象称为 《绑定对象》
 */
class ObjectEnvironmentRecords extends EnvironmentRecords {
  constructor(bindingObject) {
    super()
    this.bindingObject = bindingObject
    this.provideThis = false
  }

  HasBinding(N) {
    let envRec = this
    let bindings = envRec.bindingObject

    return bindings.hasOwnProperty(N)
  }

  CreateMutableBinding(N, D) {
    let envRec = this
    let bindings = envRec.bindingObject
    console.assert(!bindings.hasOwnProperty(N), `当前记录中已经有${N}绑定`)
    Object.defineProperty(bindings, N, {
      value: undefined,
      enumerable: true,
      writable: true,
      configurable: D,
    })
  }

  SetMutableBinding(N, V, S) {
    let envRec = this
    let bindings = envRec.bindingObject
    const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N)

    if (S && !propertyDescriptor.writable) {
      throw new Error('TypError 给一个不可变的属性赋值')
    }
    bindings[N] = V
  }

  GetBindingName(N, S) {
    let envRec = this
    let bindings = envRec.bindingObject
    let value = this.HasBinding(N)
    if (!value) {
      if (!S) {
        return undefined
      } else {
        throw new Error('RefereceError')
      }
    }
    return bindings[N]
  }

  DeleteBinding(N) {
    let envRec = this
    let bindings = envRec.bindingObject

    const propertyDescriptor = Object.getOwnPropertyDescriptor(envRec, N)
    if (!propertyDescriptor.configurable) {
      return false
    }
    delete envRec[N]
    return true
  }

  ImplicitThisValue() {
    let envRec = this
    let bindings = envRec.bindingObject
    if (this.provideThis) {
      return bindings
    }
    return undefined
  }
}

module.exports = ObjectEnvironmentRecords
