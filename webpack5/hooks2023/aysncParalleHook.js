const { AsyncParallelHook } = require('./tapable')

const hook = new AsyncParallelHook(['names'])

console.time('cost')
hook.tapAsync('1', (name, callback) => {
  setTimeout(() => {
    console.log('1', name)
    callback()
  }, 1000)
})

hook.tapAsync('2', (name, callback) => {
  setTimeout(() => {
    console.log('2', name)
    callback()
  }, 2000)
})

hook.tapAsync('3', (name, callback) => {
  setTimeout(() => {
    console.log('3', name)
    callback()
  }, 3000)
})

hook.callAsync('zhufeng', (err) => {
  console.timeEnd('cost')
})
