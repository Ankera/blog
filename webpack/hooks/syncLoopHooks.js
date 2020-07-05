
// 同步遇到某个不返回值的注册函数，会执行多次
class SyncLoopHooks {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args)
            } while (ret !== undefined);
        })
    }
}

let hooks = new SyncLoopHooks();
let total = 0;
hooks.tap("react", function (name) {
    console.log("react", name);
    return ++total === 3 ? undefined : "继续执行anekr"
})
hooks.tap("node", function (name) {
    console.log("node", name)
})

hooks.call("Tom")