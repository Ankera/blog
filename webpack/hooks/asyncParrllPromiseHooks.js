// 等到所有 tap 注册函数执行完，在执行 callAsync 回调函数

class AsyncParrallPromiseHook {
    constructor() {
        this.tasks = [];
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }

    promise(...args) {
        let tasks = this.tasks.map(task => task(...args));
        return Promise.all(tasks);
    }
}

let hooks = new AsyncParrallPromiseHook();
hooks.tapPromise("react", function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("react", name);
            resolve();
        }, 1000)
    })
})
hooks.tapPromise("node", function (name, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("node", name);
            resolve();
        }, 2000)
    })
})

hooks.promise("Tom111").then(() => {
    console.log("end promise")
})