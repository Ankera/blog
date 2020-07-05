// 'use strict';

let obj = {
    name: "TOM"
}

function fn1() {
    for (const iterator of arguments) {
        console.log('iterator', iterator)
    }
}

// fn1.bind(obj, 'aaa', 'bbb')('ccc');


// fn.call(obj, 1, 2).call(obj, 1, 1);
/**
 * call 
 * 1. 可以改变我们当前函数this的指向
 * 2. 还会让当前函数执行
 */
// this 是在函数被调用时发生的绑定，它指向什么完全取决于函数被谁调用。

Function.prototype.myCall = function (context) {
    context = context ? Object(context) : window;

    context.fn = this;
    // console.log(this)
    let args = [];
    for (let i = 1; i < Array.from(arguments).length; i++) {
        args.push(arguments[i]);
    }
    let foo = eval(`context.fn(${args.toString()});`)

    delete context.fn;
    return foo;
}

Function.prototype.myApply = function (context, args) {
    context = context ? Object(context) : window;

    context.fn = this;

    let foo = eval(`context.fn(${args.toString()});`)

    delete context.fn;
    return foo;
}

Function.prototype.myBind = function (context) {
    context = context ? Object(context) : window;

    let that = this;
    let args = Array.prototype.slice.call(arguments, 1);
    function Fn() { };
    function FBound() {
        console.log(this)
        let innerArgs = Array.prototype.slice.call(arguments);
        that.apply(this instanceof FBound ? this : context, args.concat(innerArgs));
    }

    Fn.prototype = this.prototype;
    FBound.prototype = new Fn();
    return FBound
}

let NewFn = fn1.myBind(obj, 'aaa', 'bbb');

let fn3 = new NewFn('cccc', 'ddd')

// fn1.myApply(obj, [111, 222, 333]);

Function.prototype.myCall2 = function (context) {
    context = context ? Object(context) : window;

    // this 是传进来的函数
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    eval(`context.fn(${args.toString()})`);
    delete context.fn;
}

Function.prototype.myApply2 = function (context, args) {
    context = context ? Object(context) : window;
    context.fn = this;
    eval(`context.fn(${args.toString()})`);
    delete context.fn;
}

Function.prototype.myBind2 = function (context) {
    context = context ? Object(context) : window;
    let that = this;
    let fArgs = Array.prototype.slice.call(arguments, 1);
    return function () {
        let lArgs = Array.prototype.slice.call(arguments);
        let args = fArgs.concat(lArgs);
        that.apply(context, args);
    }
}

// fn1.myCall2(obj, 1111, 2222, 3333);
fn1.myBind2(obj, 'vvv', 'bbb')('hhhh');



