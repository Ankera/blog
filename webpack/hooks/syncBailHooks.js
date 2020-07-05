// 任何一个 tap 注册的函数返回 undefined 的结果，就继续执行

class SyncBailHooks {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        let ret;
        let index = 0;
        do {
            ret = this.tasks[index++](...args);
        } while (ret === undefined && index < this.tasks.length); // 继续执行
    }
}

let hooks = new SyncBailHooks();
hooks.tap("react", function (name) {
    console.log("react", name);
    return "继续执行anekr";
})
hooks.tap("node", function (name) {
    console.log("node", name)
})

hooks.call("Tom")