module.exports = class {
    constructor() {
        this.middlewares = [];
    }

    get(pathname, callback) {
        this.middlewares.push({
            pathname,
            fn: callback
        })
    }

    compose(middles) {
        let index = 0;
        function dispatch(index) {
            if (index === middles.length) {
                return Promise.resolve();
            }

            return Promise.resolve(middles[index].fn(ctx, () => {
                dispatch(index + 1);
            }))
        }

        return dispatch(0);
    }

    routes() {
        return async (ctx, next) => {
            let pathname = ctx.path;
            let middles = this.middlewares.filter(middle => middle.pathname === pathname);
            this.compose(middles, next);
        }
    }
}