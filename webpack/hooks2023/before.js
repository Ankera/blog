const { SyncHook } = require('./tapable')

const hook = new SyncHook(['name'])

hook.tap({ name: 'tapA' }, () => {
  console.log('tapA')
})

hook.tap({ name: 'tapB' }, () => {
  console.log('tapB')
})

hook.tap({ name: 'tapC' }, () => {
  console.log('tapC')
})

hook.tap({ name: 'tapD', before: ['tapB', 'tapC'] }, () => {
  console.log('tapD')
})

hook.call('zhufeng')

console.log('test')
