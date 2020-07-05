class AsyncSeriesWaterfallHooks {
    constructor() {
        this.tasks = [];
    }

    tapAsync(name, task) {
        this.tasks.push(task);
    }

    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;

        let next = (err, data) => {
            let task = this.tasks[index];
            if (!task) {
                return finalCallback();
            }
            if (index === 0) {
                task(args, next);
            } else {
                task(data, next);
            }
            index++;
        }

        next()
    }
}

let hooks = new AsyncSeriesWaterfallHooks();
hooks.tapAsync("react", function (name, cb) {
    setTimeout(() => {
        console.log("react", name);
        cb(null, "react result");
    }, 1000)
})
hooks.tapAsync("node", function (name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb(null, " node result");
    }, 1000)
})

hooks.callAsync("Tom 10086 ", () => {
    console.log("end")
});