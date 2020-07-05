/**
 * 在函数执行之前，执行别的动作，切片
 */

Function.prototype.before = function (callback) {
    let self = this;
    return function () {
        callback && callback();
        self.apply(self, arguments);
    }
}

function fn() {
    console.log("一定的功能");
}

let newFn = fn.before(function () {
    console.log("在函数之前执行")
});

newFn();