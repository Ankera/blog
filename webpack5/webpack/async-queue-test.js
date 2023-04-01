const AsyncQueue = require('webpack/lib/util/AsyncQueue')
// const AsyncQueue = require('./async-queue.js')

/**
 *
 * 处理器函数
 * @param {*} item 需要传入里的item
 * @param {*} callback 表示处理器完成的callback
 */
function processor(item, callback) {
  if (item.key === 'item1') {
    item.number = Math.random()
    callback(null, item)
  } else {
    setTimeout(() => {
      item.number = Math.random()
      callback(null, item)
    }, 2000)
  }
}

const queue = new AsyncQueue({
  name: 'addNumber',
  processor,
  parallelism: 2,
  getKey: (item) => item.key,
})

queue.add({ key: 'item1', name: '19Qingfeng' }, (err, result) => {
  console.log('item1处理后的结果', result)
})

queue.add({ key: 'item2', name: '19Qingfeng' }, (err, result) => {
  console.log('item2处理后的结果')
})

queue.add({ key: 'item3', name: '19Qingfeng' }, (err, result) => {
  console.log('item3处理后的结果')
})
