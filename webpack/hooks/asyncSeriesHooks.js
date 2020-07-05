class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;

        let next = () => {
            if (this.tasks.length === index) {
                return finalCallback();
            }
            let task = this.tasks[index++];
            task(args, next);
        };

        next(args)
    }
}

let hooks = new AsyncSeriesHook();
hooks.tapAsync("react", function (name, cb) {
    setTimeout(() => {
        console.log("react", name);
        cb();
    }, 1000)
})
hooks.tapAsync("node", function (name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb();
    }, 1000)
})

hooks.callAsync("Tom 10086 ", 120, () => {
    console.log("end callAsync")
});