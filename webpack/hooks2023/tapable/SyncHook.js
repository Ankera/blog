const Hook = require('./Hook')
const HookCodeFactory = require('./HookCodeFactory')

class SyncHookCodeFactory extends HookCodeFactory {
  content() {
    return this.callTapsSeries()
  }
}

const factory = new SyncHookCodeFactory()

class SyncHook extends Hook {
  compile(options) {
    // 给 hook._x 赋值
    factory.setup(this, options)

    // 开始创建 new Function
    return factory.create(options)
  }
}

module.exports = SyncHook
