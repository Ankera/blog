const { SyncHook } = require('./tapable')

const hook = new SyncHook(['name'])

hook.tap({ name: 'tapA', stage: 3 }, () => {
  console.log('tapA')
})

hook.tap({ name: 'tapB', stage: 1 }, () => {
  console.log('tapB')
})

hook.tap({ name: 'tapC', stage: 9 }, () => {
  console.log('tapC')
})

hook.tap({ name: 'tapD', stage: 7 }, () => {
  console.log('tapD')
})

hook.call('zhufeng')
