const url = require("url");

let request = {
    get method() {
        return this.req.method;
    },

    get path() {
        return url.parse(this.req.url).pathname;
    },

    get url() {
        return this.req.url;
    }
}

module.exports = request;