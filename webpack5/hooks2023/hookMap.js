const { SyncHook } = require('tapable')

class HookMap {
  constructor(createHookFactory) {
    this._createHookFactory = createHookFactory
    this._map = new Map()
  }

  for(key) {
    const hook = this._map.get(key)
    if (hook) {
      return hook
    }
    const newHook = this._createHookFactory()
    this._map.set(key, newHook)
    return newHook
  }

  get(key) {
    return this._map.get(key)
  }
}

const map = new HookMap(() => new SyncHook(['name']))

map.for('key1').tap('plugin1', (name) => {
  console.log('plugin1', name)
})

map.for('key2').tap('plugin2', (name) => {
  console.log('plugin2', name)
})

const hook1 = map.get('key1')

hook1.call('zimu')
