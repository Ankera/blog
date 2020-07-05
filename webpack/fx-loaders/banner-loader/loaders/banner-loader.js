const loaderUtils = require("loader-utils");
const validateOptions = require("schema-utils");
const fs = require("fs");

function loader(source) {
    let cb = this.async();

    let options = loaderUtils.getOptions(this);

    let schema = {
        type: "object",
        properties: {
            filename: {
                type: "string"
            },
            text: {
                type: "string"
            }
        }
    };

    // 判断传入的参数是否符合逻辑规范
    validateOptions(schema, options, "banner-loader");

    let { filename, text } = options;
    if (filename) {
        fs.readFile(filename, (err, data) => {
            cb(err, `/**${data}**/${source}`);
        })
    } else if (text) {
        cb(null, `/**${text}**/${source}`);
    } else {
        cb(null, source);
    }
}

module.exports = loaderUtils;