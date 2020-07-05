/**
 * 参考链接
 * https://juejin.im/post/5d69eef7f265da03f12e70a5#heading-23
 */
function EventEmitter() {
    this._events = {};
}

// 注册监听函数时的回调函数
const NEWLISTENER = "newListener";

EventEmitter.defaultMaxListeners = 10;

// 订阅
EventEmitter.prototype.on = function (type, listener, flag) {
    if (!this._events) {
        this._events = Object.create(null);
    }

    if (this._events[type]) {
        if (flag) { // 从头部插入
            this._events[type].unshift(listener);
        } else {
            this._events[type].push(listener);
        }
    } else {
        this._events[type] = [listener];
    }

    if (type !== NEWLISTENER) {
        this.emit(NEWLISTENER, type);
    }
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

// 发布
EventEmitter.prototype.emit = function (type, ...args) {
    if (this._events[type]) {
        this._events[type].forEach(fn => {
            fn.call(this, ...args);
        });
    }
}

// 只订阅一次
EventEmitter.prototype.once = function (type, listener) {
    let self = this;
    function only(...args) {
        listener(...args);
        self.off(type, only);
    }

    only.origin = listener;
    this.on(type, only);
}

// 取消订阅
EventEmitter.prototype.off = function (type, listener) {
    if (typeof listener !== "function") {
        throw new TypeError("'listener' must be function");
    }

    if (this._events[type]) {
        this._events[type] = this._events[type].filter(fn => {
            // 过滤掉不等于 listener
            //                        on->undefined
            return fn !== listener && fn.origin !== listener;
        })
    }
}

EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

module.exports = EventEmitter;





// 测试代码
const EventEmitter = require("./events");
var emitter = new EventEmitter();

var i = 0;
emitter.on("newListener", (arg) => {
    i++;
    console.log(`绑定第${i}个事件-${arg}`);
})

const fn1 = function (arg) {
    console.log('test1触发，传入参数为：' + arg);
}

const fn2 = function (arg) {
    console.log('test2触发，传入参数为：' + arg);
}

const fn3 = function (arg) {
    console.log('test3触发，传入参数为：' + arg);
}

// emitter.on('test_hello11', fn1);
// emitter.on('test_hello11', fn2);
// emitter.on('test_hello11', fn3);

// emitter.removeListener("test_hello11", fn1);
// emitter.emit("test_hello11")

// emitter.on('test_hello22', function (arg) {
//     console.log('test2触发，传入参数为：' + arg);
// });

// emitter.on('test_hello22', function (arg) {
//     console.log('test3触发，传入参数为：' + arg);
// });



// const onceOnly = function (count, type) {
//     console.log('单次监听器触发，二次将不存在' + count + "--" + type);
// }

// emitter.once('onceEvent', onceOnly);
// emitter.off('onceEvent', onceOnly);

// emitter.emit('onceEvent', 1, 22); // 执行
// emitter.emit('onceEvent', 2, 333); 
// emitter.emit('onceEvent', 3, 5555); 