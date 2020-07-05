const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 把外链的标签变成内链的
 * 把 link 内部的样式替换为 style 内联样式
 * 把 script 内部 src 脚本替换为内部脚本
 */
class InlineSourcePlugin {

    constructor({ match }) {
        this.reg = match;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap("InlineSourcePlugin", compilation => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync("alterPlugin", (data, cb) => {
                // 处理引入标签的数据
                data = this.processTags(data, compilation)
                cb(null, data);
            })
        })
    }

    processTags(data, compilation) {
        let headTags = [];
        let bodyTags = [];
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation));
        });

        data.bodyTags.forEach(headTag => {
            bodyTags.push(this.processTag(headTag, compilation));
        });

        return { ...data, headTags, bodyTags };
    }

    // 处理明细一个标签
    processTag(tag, compilation) {
        let newTag, url;
        
        if (tag.tagName === "link" && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: "style",
                attributes: {
                    type: "text/css"
                }
            }
            url = tag.attributes.href;
        } 

        if (tag.tagName === "script" && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: "script",
                attributes: {
                    type: "application/javascript"
                }
            }
            url = tag.attributes.src;
        } 

        if(url){
            // 文件内容
            newTag.innerHTML = compilation.assets[url].source();
            delete compilation.assets[url];
            return newTag;
        }

        return tag;
    }
}

module.exports = InlineSourcePlugin;