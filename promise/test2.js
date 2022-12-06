
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ok 2')
//   }, 1000);
// })

// const p3 = new Promise((resolve, reject) => {
//   reject('err 3')
// })

// Promise.race([p1, p2, p3]).then(d => {
//   console.log('success ', d)
// }, e => {
//   console.log('error ', e)
// })

function wrapPromise (promise1) {
  let abort;
  let promise2 = new Promise((resolve, reject) => {
    abort = reject;
  });
  const newPromise = Promise.race([promise1, promise2]);
  newPromise.abort = abort;
  return newPromise;
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok 1')
  }, 3000);
})

const newP = wrapPromise(p1);

setTimeout(() => {
  // 交接口之前终止
  newP.abort('失败')
}, 2000);

newP.then(d => {
  console.log('success ', d)
}, e => {
  console.log('error ', e)
})