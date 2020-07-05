// 等到所有 tap 注册函数执行完，在执行 callAsync 回调函数

class AsyncParrallHook {
    constructor() {
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let self = this;
        function done() {
            index++;
            if (index === self.tasks.length) {
                finalCallback();
            }
        }

        self.tasks.forEach(task => {
            task(...args, done);
        })
    }
}

let hooks = new AsyncParrallHook();
hooks.tapAsync("react", function (name, cb) {
    setTimeout(() => {
        console.log("react", name);
        cb && cb();
    }, 1000)
})
hooks.tapAsync("node", function (name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb && cb();
    }, 2000)
})

hooks.callAsync("Tom", () => {
    console.log("end")
})