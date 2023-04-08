function CreateArgumentsObject(func, names, args, env, strict) {
  let len = args.length
  let obj = {}

  obj[`[[Class]]`] = 'Arguments'

  obj.constructor = Object

  obj[`[[Prototype]]`] = Object.prototype

  Object.defineProperty(obj, 'length', {
    value: len,
    writable: true,
    enumerable: false,
    configurable: true,
  })

  let index = len - 1
  while (index >= 0) {
    let val = args[index]
    Object.defineProperty(obj, index.toString(), {
      value: val,
      writable: true,
      enumerable: true,
      configurable: true,
    })
    index = index - 1
  }
  return obj
}

module.exports = CreateArgumentsObject
