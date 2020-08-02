let path = require("path");
let fs = require("fs");
let vm = require("vm");

/**
 * 模块化的作用
 *  1. 解决命名冲突
 *  2. 方便维护
 */

function myRequire(id) {
    let absPath = Module._resolveFileName(id);
    if (Module._cacheModule[absPath]) {
        return Module._cacheModule[absPath]
    } else {
        let module = new Module(absPath);

        module.load();

        Module._cacheModule[module.id] = module.exports;
        return module.exports;
    }
}

function Module(id) {
    this.id = id;
    this.exports = {};  // 代表的是模块的返回结果
    this.loaded = false; //模块是否已加载完毕
}

// 缓存策略
Module._cacheModule = {};

Module._resolveFileName = function (id) {
    let absPath = path.resolve(id);
    if (!path.extname(absPath)) {
        let extnameArray = Object.keys(Module._extensions);
        for (let i = 0; i < extnameArray.length; i++) {
            let file = absPath + extnameArray[i];
            try {
                fs.accessSync(file);
                return file;
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        return absPath;
    }
}

Module.wrapper = [
    "(function(exports, require, module, __dirname, __filename){",
    "})"
]

Module.prototype.load = function () {
    let extname = path.extname(this.id);
    Module._extensions[extname](this);
}

Module._extensions = {
    ".js"(module) {
        let str = fs.readFileSync(module.id, "utf8");
        let scriptStr = Module.wrapper[0] + str + Module.wrapper[1];
        let fn = vm.runInThisContext(scriptStr);
        /**
            function(exports, require, module, __dirname, __filename){
                module.exports = function sum(a, b) {
                    return a + b;
                }
            }
         */
        fn.call(module.exports, module.exports, myRequire, module, path.dirname(module.id), module.id);
    },
    ".json"(module) {
        let str = fs.readFileSync(module.id, "utf8");
        str = JSON.parse(str);
        module.exports = str;
    },
    ".node"(module) {
        // 解析为二进制插件模块
    }
}

let sum = myRequire("./sum.js");
console.log(sum(111, 222));