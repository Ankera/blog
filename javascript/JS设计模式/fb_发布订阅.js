
/**
 * 当你订阅了一份报纸，每天都会有一份最新的报纸送到你手上，
 * 有多少人订阅报纸，报社就会发多少份报纸，这是典型的订阅—发布模式，
 * 报社和订报纸的客户就是上面文章开头所说的“一对多”的依赖关系。
 * 
 * 
 * 发布订阅模式
 * 订阅函数1
 * e.on(()=>{
 *      console.log(111)
 * })
 * 
 * 订阅函数2
 * e.on(()=>{
 *      console.log(222)
 * })
 * 
 * 订阅存储的数组 
 * [fn1, fn2]
 * 
 * 
 * 发布会自动触发上面数组里面的函数
 * e.emit(...) 
 */

function EventEmitter() {
    this._arr = [];
}

EventEmitter.prototype.on = function (callback) {
    this._arr.push(callback)
}

EventEmitter.prototype.emit = function () {
    this._arr.forEach(fn => fn());
}

let e = new EventEmitter();
e.on(() => {
    console.log("订阅的第一个函数");
});

e.on(() => {
    console.log("订阅的第二个函数");
});


// 发布
e.emit();