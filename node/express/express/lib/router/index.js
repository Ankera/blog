const url = require("url");
const Route = require("./route");
const Layer = require("./layer");
const methods = require("./methods");

function Router() {
    let router = (req, res, next) => {
        router.handler(req, res, next);
    }

    // 存储路由
    router.stack = [];
    router.__proto__ = proto;
    router.paramsCallback = {};
    return router;
}

let proto = {};

proto.route = function (path) {
    let route = new Route();

    let layer = new Layer(path, route.dispatch.bind(route));

    // 标识是一个路由
    layer.route = route;
    this.stack.push(layer);
    return route;
}

proto.use = function (path, handler) {
    if (typeof path === "function") {
        handler = path;
        path = "/";
    }

    let layer = new Layer(path, handler);

    // 标识不是路由，是中间件
    layer.route = undefined;
    this.stack.push(layer);
}

// 每次调用 get 会产生一个层
methods.forEach(method => {
    proto[method] = function (path, handlers) {
        let route = this.route(path);
        route[method](handlers);
    }
})

proto.handler = function (req, res, out) {
    let { pathname } = url.parse(req.url);

    let self = this;
    let idx = 0;
    let removed = "";
    let dispatch = (err) => {
        if (idx === this.stack.length) {
            return out();
        }
        if (removed) {
            req.url = removed + req.url;
            removed = "";
        }
        let layer = this.stack[idx++];
        if (err) {
            // 只处理中间件
            if (!layer.route) {
                layer.handler_error(err, req, res, dispatch);
            } else {
                // 路由直接忽略
                dispatch(err)
            }
        } else {
            if (layer.match(pathname)) {
                // 正常中间件 不能执行错误中间件
                if (!layer.route && layer.handler.length !== 4) {  // 中间件
                    if (layer.path !== "/") {
                        removed = layer.path;
                        req.url = req.url.slice(removed.length);
                    }

                    layer.handler_request(req, res, dispatch);
                } else {
                    if (layer.route && layer.route.methods[req.method.toLowerCase()]) {
                        req.params = layer.params || {};
                         // 将订阅好的事件发布,先处理措施
                        self.process_params(layer, req, res, function () {
                            layer.handler_request(req, res, dispatch);
                        });
                    } else {
                        dispatch();
                    }
                }
            } else {
                dispatch();
            }
        }

        // 无 use 中间件时
        // if (layer.match(pathname) && layer.route.methods[req.method.toLowerCase()]) {
        //     layer.handler_request(req, res, dispatch)
        // } else {
        //     dispatch();
        // }
    }

    dispatch();
}

proto.param = function (key, handler) {
    if (this.paramsCallback[key]) {
        this.paramsCallback.push(handler);
    } else {
        this.paramsCallback[key] = [handler];
    }
}

proto.process_params = function (layer, req, res, done) {

    if (!layer.keys || layer.keys.length === 0) {
        return done();
    }

    let keys = layer.keys.map(item => item.name);
    let params = this.paramsCallback;
    let idx = 0;
    function next() {
        if (idx === keys.length) {
            return done();
        }
        let key = keys[idx++];
        processCallback(key, next);
    }
    next();

    function processCallback(key, out) {
        let fns = params[key] || [];
        let idx = 0;
        let value = req.params[key];
        function next() {
            if (idx === fns.length) {
                return out();
            }
            let fn = fns[idx++];
            fn(req, res, next, value, key);
        }

        next();
    }
    return done();
}

module.exports = Router;