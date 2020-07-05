// 同步钩子
class SyncHooks {
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
        } while (ret !== undefined && index < this.tasks.length);
    }
}

const hooks = new SyncHooks();
hooks.tap("react", (name) => {
    console.log("react", name);
    return name;
});

hooks.tap("node", data => {
    console.log("node", data)
});

hooks.call("John")