/**
 * 异步插件
 */
class AsyncPlugin {
    apply(compiler){
        compiler.hooks.emit.tapAsync("DonePlugin", (compilation, cb) => {
            console.log("AsyncPlugin");
            setTimeout(() => {
                cb()
            }, 1000)
        });

        compiler.hooks.emit.tapPromise("DonePlugin", (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("在等一秒")
                    resolve();
                }, 1000)
            })
        })
    }
}

module.exports = AsyncPlugin;