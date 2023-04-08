const EnvironmentRecords = require('./EnvironmentRecords')

class Reference {
  constructor(base, name, strict) {
    this.base = base
    this.name = name
    this.strict = strict
  }
  static GetBase(V) {
    return V.base
  }
  static GetReferencedName(V) {
    return V.name
  }
  static IsStrictReference(V) {
    return V.strict
  }
  static HasPrimitiveBase(V) {
    return (
      V.base.toString() === `[Object Boolean]` ||
      V.base.toString() === `[Object String]` ||
      V.base.toString() === `[Object Number]`
    )
  }
  static IsPropertyReference(V) {
    return (
      (typeof V.base === 'object' && !(V.base instanceof EnvironmentRecords)) ||
      Reference.HasPrimitiveBase(V)
    )
  }
  static IsUnresolvableReference(V) {
    return typeof V.base === 'undefined'
  }
  static GetValue(V) {
    //如果 Type(V) 不是引用 , 返回 V。
    if (!Reference.Type(V)) return V
    //令 base 为调用 GetBase(V) 的返回值
    let base = Reference.GetBase(V)
    //如果 IsUnresolvableReference(V), 抛出一个 ReferenceError 异常。
    if (Reference.IsUnresolvableReference(V)) {
      console.log('VVVV===', V)
      throw new Error(`ReferenceError ${V} is not defined`)
    }
    //如果 IsPropertyReference(V),
    if (Reference.IsPropertyReference(V)) {
      //如果 HasPrimitiveBase(V) 是 false,
      if (!Reference.HasPrimitiveBase(V)) {
        let name = Reference.GetReferencedName(V)
        return base[name]
      } else {
        let O = Reference.ToObject(base)
        let name = Reference.GetReferencedName(V)
        let desc = Object.getOwnPropertyDescriptor(O, name)
        if (typeof desc === 'undefined') return undefined
        if (Reference.IsDataDescriptor(desc)) {
          return desc.value
        } else if (IsAccessorDescriptor(desc)) {
          let getter = desc.get
          if (typeof getter === 'undefined') return undefined
          return getter.call(base)
        }
      }
    } else {
      //否则 , base 必须是一个 environment record
      //传递 GetReferencedName(V) 和 IsStrictReference(V) 为参数调用 base 的 GetBindingValue( 见 10.2.1) 具体方法，返回结果。
      let name = Reference.GetReferencedName(V)
      let strict = Reference.IsStrictReference(V)
      base.GetBindingValue(name, strict)
    }
    return base(Reference.GetReferencedName(V))
  }
  static IsDataDescriptor(desc) {
    return desc.value || desc.writable
  }
  static IsAccessorDescriptor(desc) {
    return desc.get || desc.set
  }
  static ToObject(PrimitiveValue) {
    let type = Object.prototype.toString.call(PrimitiveValue).slice(8, -1)
    switch (type) {
      case 'Boolean':
        return new Boolean(PrimitiveValue)
      case 'Number':
        return new Number(PrimitiveValue)
      case 'String':
        return new String(PrimitiveValue)
      default:
        break
    }
  }
  static Type(V) {
    return V instanceof Reference
  }
}
module.exports = Reference
