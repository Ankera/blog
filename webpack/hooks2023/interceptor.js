/**
 * 拦截器
 */
const { SyncHook } = require('./tapable')

const syncHook = new SyncHook(['name', 'age'])

const intercept1 = {
  register(name) {
    console.log('register 11', name)
  },
  tap() {
    console.log('tap 11')
  },
  call() {
    console.log('call 11')
  },
}

syncHook.intercept(intercept1)

const intercept2 = {
  register() {
    console.log('register 22')
  },
  tap() {
    console.log('tap 22')
  },
  call() {
    console.log('call 22')
  },
}

syncHook.intercept(intercept2)

syncHook.tap({ name: '回调A' }, () => {
  console.log('回调A')
})

syncHook.tap({ name: '回调B' }, () => {
  console.log('回调B')
})

syncHook.call()
