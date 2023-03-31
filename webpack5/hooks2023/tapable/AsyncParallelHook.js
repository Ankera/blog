const Hook = require('./Hook')
const HookCodeFactory = require('./HookCodeFactory')

class AsyncParallelHookCodeFactory extends HookCodeFactory {
  content({ onDone }) {
    return this.callTapsParalle({ onDone })
  }
}

const factory = new AsyncParallelHookCodeFactory()

class AsyncParallelHook extends Hook {
  compile(options) {
    // 给 hook._x 赋值
    factory.setup(this, options)

    // 开始创建 new Function
    return factory.create(options)
  }
}

module.exports = AsyncParallelHook
