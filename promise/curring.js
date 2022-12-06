const curring = (fn, arr = []) => {
  let len = fn.length;

  return (...args) => {
    let newArgs = [...arr, ...args]
    if (len === newArgs.length) {
      return fn(...args);
    } else {
      return curring(fn, newArgs);
    }
  }
}

function sum (a, b, c, d, e) {
  return a + b + c + d + e;
}

const newSum = curring(sum);

// =========================================================================

let after = (times, callback) => {
  return () => {
    --times;
    if (times === 0) {
      callback();
    }
  }
}

let obj = {}

let fn = after(2, () => {
  console.log('after obj', obj)
})

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ age: 12 })
  }, Math.random() * 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "Tom" })
  }, Math.random() * 1000);

})



p1.then(data => {
  obj = { ...obj, ...data };
  fn();
})

p2.then(data => {
  obj = { ...obj, ...data };
  fn();
})