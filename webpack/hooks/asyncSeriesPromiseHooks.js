class AsyncSeriesPromiseHook {
    constructor() {
        this.tasks = [];
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }

    promise(...args) {
        let [first, ...others] = this.tasks;
        return others.reduce((p, n) => {
            return p.then(() => n(...args))
        }, first(...args));
    }
}

let hooks = new AsyncSeriesPromiseHook();
hooks.tapPromise("react", function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("react", name);
            resolve();
        }, 1000)
    })
})
hooks.tapPromise("node", function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("node", name);
            resolve();
        }, 1000)
    })
})

hooks.promise("Tom 10086 ").then(() => {
    console.log("end callAsync")
});