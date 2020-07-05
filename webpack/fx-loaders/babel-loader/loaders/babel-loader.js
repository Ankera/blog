const babel = require("@babel/core");
const loaderUtils = require("loader-utils");

function loader(source) {
    const options = loaderUtils.getOptions(this);

    let callback = this.async();
    babel.transform(source, {
        ...options,
        sourceMaps: true
    }, (err, result) => {
        callback(err, result.code, result.map);
    })
}

module.exports = loader;