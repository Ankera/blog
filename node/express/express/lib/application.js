const http = require("http");
const Router = require("./router");
const methods = require("./router/methods");

/**
 * 核心思想，路由和应用分离
 * 
 * 中间件的概念主要控制是否可以继续向下执行
 * 可以扩展 req res 方法
 * 中间件可以处理一些逻辑
 * 
 * 中间件路径完全匹配，或以什么开头
 */

function Application() {
    // 调用路由时再创建
    // this._router = new Router();
}

Application.prototype.lazy_router = function () {
    if (!this._router) {
        this._router = new Router();
    }
}

Application.prototype.use = function (path, handler) {
    this.lazy_router();
    this._router.use(path, handler);
}

methods.forEach(method => {
    Application.prototype[method] = function (path, ...handlers) {
        this.lazy_router();
        this._router[method](path, handlers);
    }
})

Application.prototype.param = function (key, handler) {
    this.lazy_router();
    this._router.param(key, handler);
}

Application.prototype.listen = function (...args) {
    let self = this;
    let server = http.createServer(function (req, res) {
        function done() {
            res.statusCode = 404;
            res.end(`Cannot ${req.method} ${req.url}`);
        }

        self.lazy_router();
        self._router.handler(req, res, done);
    })

    server.listen(...args);
}

module.exports = Application;