// 还未执行
const QUEUED_STATE = 0
// 正在处理
const PROCESSING_STATE = 1
// 处理完成
const DONE_STATE = 2

class ArrayQueue {
  constructor() {
    this._list = []
  }
  enqueue(item) {
    this._list.push(item)
  }

  dequeue() {
    // 第一个移除
    return this._list.shift()
  }
}

class AsyncQueueEntry {
  constructor(item, callback) {
    this.item = item
    this.state = QUEUED_STATE
    this.callback = callback
  }
}

class AsyncQueue {
  constructor({ name, processor, parallelism, getKey }) {
    // 队列的名称
    this._name = name
    // 并发的个数
    this._processor = processor
    // 每个条目的处理器
    this._parallelism = parallelism
    // 每个类目的唯一标识
    this._getKey = getKey
    // 用来判断此条目是否加载过
    this._entries = new Map()
    // 存放条目
    this._queue = new ArrayQueue()
    // 当前正在执行的任务数，如果正在执行的是三个，就是 3
    this._activeTasks = 0
    // 是否马上开始执行任务
    this._willEnsureProcessing = false
  }

  add(item, callback) {
    const key = this._getKey(item)
    const oldEntry = this._entries.get(key)
    if (oldEntry) {
      if (oldEntry.state === DONE_STATE) {
        process.nextTick(() => {
          callback(oldEntry.error, oldEntry.callback)
        })
      } else {
        if (oldEntry.callbacks) {
          oldEntry.callbacks.push(callback)
        } else {
          oldEntry.callbacks = [callback]
        }
      }
      return
    }

    const newEntry = new AsyncQueueEntry(item, callback)
    this._entries.set(key, newEntry)
    this._queue.enqueue(newEntry)

    if (!this._willEnsureProcessing) {
      this._willEnsureProcessing = true
      setImmediate(this._ensureProcessing)
    }
  }

  _ensureProcessing = () => {
    while (this._activeTasks < this._parallelism) {
      const entry = this._queue.dequeue()
      if (!entry) {
        break
      }
      this._activeTasks++
      entry.state = PROCESSING_STATE
      this._startProcessing(entry)
    }
    this._willEnsureProcessing = false
  }

  _startProcessing = (entry) => {
    this._processor(entry.item, (err, result) => {
      this._handleResult(entry, err, result)
    })
  }

  _handleResult = (entry, err, result) => {
    // 此条目其他回调函数
    const callbacks = entry.callbacks
    // 此条目的回调函数
    const callback = entry.callback
    entry.state = DONE_STATE
    entry.result = result
    entry.error = err

    callback(err, result)

    if (callbacks) {
      callbacks.forEach((fn) => fn(err, result))
    }

    // 让正在执行的任务数目减1
    this._activeTasks--

    if (!this._willEnsureProcessing) {
      this._willEnsureProcessing = true
      setImmediate(this._ensureProcessing)
    }
  }
}

module.exports = AsyncQueue
