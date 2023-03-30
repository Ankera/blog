const { AsyncParallelHook } = require('./tapable')

const hook = new AsyncParallelHook(['names'])

console.time('cost')
hook.tapPromise('1', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1)
      resolve(name)
    }, 1000)
  })
})
hook.tapPromise('2', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2)
      resolve(name)
    }, 2000)
  })
})

hook.tapPromise('3', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3)
      resolve(name)
    }, 3000)
  })
})

hook.promise('zhufeng').then(() => {
  console.timeEnd('cost')
})
