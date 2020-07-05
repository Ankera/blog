const loaderUtils = require("loader-utils");
const mime = require("mime");

function loader(source) {
    let { limit } = loaderUtils.getOptions(this);

    if(limit && limit > source.length){
        return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString("base64")}"`
    } else {
        // 就是调用 file-loader 
        return require("../../file-loader/loaders/file-loader").call(this, source);
    }
}


loader.raw = true; // 二进制

module.exports = loader;