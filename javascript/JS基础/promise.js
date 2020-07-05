/**
 * 3种状态
 * Promise 
 * ==> pending   等待状态
 * ==> fulfilled 成功状态
 * ==> rejected  失败状态
 */

const PENDING = "PENDING";
const RESOVLED = "RESOVLED";
const REJECTED = "REJECTED";

function Promise(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolveCallbacks = []; // 存储成功的回调函数
    this.onRejectCallbacks = []; // 存储失败的回调函数

    let self = this;
    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        if (self.status === PENDING) {
            self.value = value;
            self.status = RESOVLED;
            // 发布订阅中的发布
            self.onResolveCallbacks.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.reason = reason;
            self.status = REJECTED;
            self.onRejectCallbacks.forEach(fn => fn());
        }
    }

    // 解释器会立即执行
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error)
    }
}


/**
 * 如果 then 方法中返回的是一个 promise，那就采用这个 promise 的状态，作为成功或失败，把 promise 的结果作为参数
 * 如果返回的是一个普通值，直接作为下一个 then 的成功的参数
 * 在 then 方法中抛出异常，也会走失败
 * 如果错误中返回个普通值，会变成成功状态
 * 
 * 每一个then方法都返回一个新的 promise
 */
Promise.prototype.then = function (onfulfilled, onrejected) {
    // 值的传透
    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : val => val;
    onrejected = typeof onrejected === "function" ? onrejected : (err) => {
        throw err;
    };

    let self = this;
    let resultPromise = new Promise(function (resovle, reject) {
        if (self.status === RESOVLED) {
            setTimeout(() => {
                try {
                    let val = onfulfilled(self.value);
                    nextPromise(resultPromise, val, resovle, reject);
                } catch (error) {
                    reject(error)
                }
            })
        }

        if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    let val = onrejected(self.reason);
                    nextPromise(resultPromise, val, resovle, reject);
                } catch (error) {
                    reject(error);
                }
            })
        }

        // 如果状态没有改变，则说明是异步， 发布订阅中的订阅
        if (self.status === PENDING) {
            self.onResolveCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let val = onfulfilled(self.value);
                        nextPromise(resultPromise, val, resovle, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            });

            self.onRejectCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let val = onrejected(self.reason);
                        nextPromise(resultPromise, val, resovle, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            });
        }
    });

    return resultPromise;
}

Promise.prototype.catch = function (errCallback) {
    return this.then(null, errCallback);
}



function nextPromise(promise, val, resolve, reject) {
    if (promise === val) {
        return reject(new TypeError("循环引用，导致失败"));
    }

    if (val !== null && (typeof val === 'object' || typeof val === 'function')) {
        let called;
        try {
            let then = val.then;
            if (typeof then === 'function') {
                then.call(val, success => {
                    // 失败和成功只能调用一个
                    if (called) {
                        return;
                    }
                    called = true;
                    // resolve(success);
                    // resolve里面是 promise
                    nextPromise(nextPromise, success, resolve, reject);
                }, error => {
                    if (called) {
                        return;
                    }
                    called = true;
                    reject(error);
                });
            } else {
                resolve(val);
            }
        } catch (error) {
            if (called) {
                return;
            }
            called = true; // 防止出错后继续调用
            reject(error);
        }

    } else {
        resolve(val);
    }
}

// npm i promises-aplus-tests -D
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        return resolve(value);
    })
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        return reject(reason);
    })
}

Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let count = 0;

        function processData(key, value) {
            arr[key] = value;
            if (++count === values.length) {
                resolve(arr);
            }
        }

        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            let then = current.then;
            if (then && typeof then === "function") {
                then.call(current, y => {
                    processData(i, y);
                }, reject);
            } else {
                processData(i, current);
            }
        }
    })
}

Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            let current = values[i];
            let then = current.then;
            if (then && typeof then === "function") {
                then.call(current, y => {
                    resolve(y);
                }, reject);
            } else {
                resolve(current);
                break;
            }
        }
    })
}

// module.exports = Promise;