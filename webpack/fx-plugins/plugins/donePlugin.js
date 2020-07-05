/**
 * 同步插件
 */
class DonePlugin {
    apply(compiler){
        compiler.hooks.done.tap("DonePlugin", () => {
            console.log("编译完成")
        })
    }
}

module.exports = DonePlugin;