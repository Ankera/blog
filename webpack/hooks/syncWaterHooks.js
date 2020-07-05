// 把上一次 tap 的返回结果传给下一个 tap

class SyncWaterfallHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        let [first, ...others] = this.tasks;
        let ret = first(...args);
        others.reduce((a, b) => {
            return b(a)
        }, ret);
    }
}

let hooks = new SyncWaterfallHook();
hooks.tap("react", function (name) {
    console.log("react", name);
    return "Anker ... "
})
hooks.tap("node", function (data) {
    console.log("node", data)
})

hooks.call("Tom")