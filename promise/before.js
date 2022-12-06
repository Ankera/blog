function core (a, b) {
  console.log('core', a, b);
}

Function.prototype.before = function (fn) {
  return (...args) => {
    fn();
    this(...args);
  }
}

var newFn = core.before(() => {
  console.log('before core')
});

newFn(1, 2);