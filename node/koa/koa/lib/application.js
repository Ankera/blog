const Emitter = require("events");
const context = require("./context");
const request = require("./request");
const response = require("./response");
const http = require("http");
const Stream = require("stream");

class Koa extends Emitter {
    constructor() {
        super();
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.middlewares = [];
    }

    use(fn) {
        if (typeof fn !== "function") {
            throw new Error("middleware must be function");
        }

        this.middlewares.push(fn);
    }

    createContext(req, res) {
        let ctx = Object.create(this.context);
        // 封装
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);

        ctx.app = request.app = response.app = this;

        // 原生
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        ctx.statusCode(404);
        // this.fn(ctx);

        this.compose(this.middlewares, ctx).then(data => {
            let body = ctx.body;
            if (body instanceof Stream) {
                body.pipe(res);
            } else if (typeof body === "object") {
                ctx.set("Content-Type", "application/json");
                res.end(JSON.stringify(body));
            } else if (typeof body === "string" || Buffer.isBuffer(body)) {
                res.end(ctx.body);
            } else {
                res.end("NOT FOUND");
            }
        }).catch(error => {
            this.emit("error", error);
        })
    }

    compose(middlewares, ctx) {
        let i = -1;
        function dispatch(index) {
            // 不允许同一个 next 调用多次
            if (index <= i) {
                return Promise.reject("next() called multiple times");
            }

            if (index === middlewares.length) {
                return Promise.resolve();
            }
            i = index;
            // Promise.resolve 保证返回的是promise
            return Promise.resolve(middlewares[index](ctx, () => {
                dispatch(index + 1);
            }))
        }

        return dispatch(0);
    }

    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this));

        server.listen(...args);
    }
}

module.exports = Koa;