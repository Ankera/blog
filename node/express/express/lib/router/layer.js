const { pathToRegexp } = require("path-to-regexp");

function Layer(path, handler) {
    this.path = path;
    this.handler = handler;

    this.reg = pathToRegexp(this.path, this.keys = []);
}

Layer.prototype.handler_request = function (req, res, next) {
    this.handler(req, res, next);
}

Layer.prototype.handler_error = function (err, req, res, next) {
    if (this.handler.length === 4) {
        return this.handler(err, req, res, next)
    } else {
        next(err);
    }
}

Layer.prototype.match = function (patchname) {
    let match = patchname.match(this.reg);
    if (match) {
        this.params = this.keys.reduce((memo,current, index) => {
            memo[current.name] = match[index+1];
            return memo;
        }, {});
        return true;
    }

    if (this.path === patchname) {
        return true;
    }

    // 如果是中间件，特殊处理
    if (!this.route) {
        if (this.path === "/") {
            return true;
        }

        return patchname.startWith(this.path + "/");
    }

    return false;
}

module.exports = Layer;