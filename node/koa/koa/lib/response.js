let response = {
    get body() {
        return this._body;
    },

    set body(newValue) {
        this.statusCode(200);
        this._body = newValue;
    },

    set(key, value) {
        this.res.setHeader(key, value);
    },

    statusCode(value) {
        this.res.statusCode = value;
    }
}

module.exports = response;