// const Promise = require('./basePromise');
// const p = new Promise((resolve, reject) => {
//   resolve('hello')
// });

// let promise2 = p.then((data) => {
//   return new Promise((resolve, reject) => {
//     resolve(new Promise((resolve2, reject2) => {
//       // resolve2('data 2233 ')
//       // reject('error sound')
//       resolve2(new Promise((resolve3, reject3) => {
//         resolve3('resolve3')
//       }))
//     }))
//   })
// }, (error) => {
//   console.log('error1===>', error);
// })

// promise2.then((data) => {
//   console.log('data2===>', data);
// }, (error) => {
//   console.log('error2===>', error);
// })


// // const p2 = new Promise((resolve, reject) => {
// //   resolve('ok ok')
// // }).then().then().then().then(d => {
// //   console.log('d ==>', d)
// // })


const p11 = new Promise((resolve, reject) => {
  resolve('ok 1');
});

const p12 = new Promise((resolve, reject) => {
  resolve('ok 2');
});

// Promise.resolve(p11).then(data => {
//   console.log('data ===> ', data)
// });

Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      resolve(promises);
      return;
    }

    const result = [];
    let count = 0;

    function processData (index, val) {
      result[index] = val;
      if (++count === promises.length) {
        resolve(result)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      if (isPromise(p)) {
        p.then((d) => {
          processData(i, d);
        }, reject);
      } else {
        processData(i, p);
      }
    }
  })
}

Promise.all([p11, p12]).then((data) => {
  // console.log('data', data)
})

Promise.resolve('Tom1').finally((data) => {
  console.log('finally', data);
  return new Promise((resolve, reject) => {
    resolve('Tom2')
  })
}).then(d => {
  console.log('finally success', d);
}, e => {
  console.log('finally error', e);
})


Promise.prototype.finally = (callback) => {
  return this.then((data) => {
    return Promise.resolve(callback()).then(() => data);
  }, (error) => {
    return Promise.resolve(callback()).then(() => {
      throw error;
    });
  })
}

function promiseify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
}

function promiseifyAll (target) {
  if (target !== null && typeof target === 'object') {
    Reflect.ownKeys(target).forEach(key => {
      target[key + 'Async'] = promiseify(target[key]);
    })
  }
  return target;
}

function isPromise (value) {
  return value !== null && typeof value === 'object' && typeof value.then === 'function';
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const currentVal = promises[i];
      if (isPromise(currentVal)) {
        currentVal.then(resolve, reject);
      } else {
        resolve(currentVal);
      }
    }
  })
}

let p111 = new Promise((resolve, reject) => {
  resolve('hello')
})

new Promise((resolve, reject) => {
  p111.then((d) => {
    resolve(d)
  }, reject)
}).then(d => {
  console.log('finally ', d)
})

let p121 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 3000)
});


p121.then((d) => {
  console.log('p121 ', d)
}, e => {
  console.log('p121 ', e);
})