let ctx = {};

function defineGetter(property, key) {
    ctx.__defineGetter__(key, function () {
        // this === Object.create(this.context);
        return this[property][key];
    })
}

function defineSetter(property, key) {
    ctx.__defineSetter__(key, function (value) {
        this[property][key] = value;
    })
}

defineGetter("request", "method");
defineGetter("request", "path");
defineGetter("request", "url");

defineGetter("response", "body");
defineSetter("response", "body");

defineGetter("response", "set");

defineGetter("response", "statusCode");

module.exports = ctx;