
/**
 * executor resolve, reject
 * 三种状态：pending，fulfilled，rejected
 */

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = val;
        this.resolvedCallbacks.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
        this.rejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
      throw err;
    };
    const self = this;

    const promise2 = new Promise((resolve, reject) => {
      if (self.status === STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(self.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (self.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (self.status === STATUS.PENDING) {
        self.resolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(self.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        self.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(self.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

function resolvePromise (x, promise2, resolve, reject) {
  // 防止自己等待自己完成，死循环
  if (x === promise2) {
    return reject(new TypeError("循环引用，导致失败"));
  }

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let calleed;
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (calleed) {
            return;
          }
          calleed = true;
          // 递归解析成功的 y 值， y值有可能是 promise
          resolvePromise(y, promise2, resolve, reject);
        }, function (r) {
          if (calleed) {
            return;
          }
          calleed = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    } catch (error) {
      if (calleed) {
        return;
      }
      calleed = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

// promises-aplus-tests 测试用例

Promise.defer = Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;
