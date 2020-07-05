const loaderUtils = require("loader-utils");

function loader(source){
    let filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
        content: source
    });

    this.emitFile(filename, source);

    return `module.exports="${filename}"`;
}

// 处理二进制的标志
loader.raw = true; 

module.exports = loader;