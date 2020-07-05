// this 是在函数被调用时发生的绑定，它指向什么完全取决于函数被谁调用。

Function.prototype.myCall = function (context) {
    context = context ? Object(context) : window;

    context.fn = this;

    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    eval(`context.fn(${args.toString()})`);

    delete context.fn;
}


Function.prototype.myApply = function (context, args) {
    context = context ? Object(context) : window;
    context.fn = this;
    eval(`context.fn(${args.toString()})`);
    delete context.fn;
}

Function.prototype.myBind = function (context) {
    context = context ? Object(context) : window;
    let fargs = Array.prototype.slice.call(arguments, 1);
    let that = this;
    return function () {
        let largs = Array.prototype.slice.call(arguments);
        that.apply(context, fargs.concat(largs));
    }
}