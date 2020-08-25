const Layer = require("./layer");
const methods = require("./methods");

function Route() {
    this.stack = [];
    this.methods = {}; // 记录用户绑定的方法
}

Route.prototype.dispatch = function (req, res, out) {
    let idx = 0;
    let method = req.method.toLowerCase();
    let self = this;
    function dispatch(err) {
        if (err) { // 如果出错，这直接出去
            return out(err);
        }

        if (idx === self.stack.length) {
            return out();
        }

        let layer = self.stack[idx++];
        // 获取内部的第一层
        if (layer.method === method) {
            layer.handler_request(req, res, dispatch);
        } else {
            dispatch();
        }
    }

    dispatch();
}

methods.forEach(method => {
    Route.prototype[method] = function (handlers) {
        handlers.forEach(handler => {
            let layer = new Layer("/", handler);
            layer.method = method;
            // 标识
            this.methods[method] = true;
            this.stack.push(layer);
        });
    }
})

module.exports = Route;