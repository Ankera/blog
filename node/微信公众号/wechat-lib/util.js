const xml2js = require("xml2js");
const template = require("./tpl");

exports.parseXML = xml => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { trim: true }, (err, content) => {
            if (err) {
                reject(err)
            } else {
                resolve(content);
            }
        })
    })
}

const formatMessage = result => {
    let message = {};
    if (typeof result === "object") {
        const keys = Object.keys(result);
        for (let i = 0; i < keys.length; i++) {
            const item = result[keys[i]];
            const key = keys[i];
            if (!(item instanceof Array) || item.length === 0) {
                continue;
            }
            if (item.length === 1) {
                let val = item[0];
                if (typeof val === "object") {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || "").trim();
                }
            } else {
                message[key] = [];
                for (let j = 0; j < item.length; j++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }

    return message;
}

const tpl = (content, message) => {
    let type = "text";
    if (Array.isArray(content)) {
        type = "news";
    }
    if (!content) {
        content = "首次关注自动回复";
    }

    if (content && content.type) {
        type = content.type;
    }

    let info = Object.assign({}, {
        content: content,
        msgType: type,
        createTime: new Date().getTime(),
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        msgId: message.MsgId
    });

    return template(info);
}

exports.formatMessage = formatMessage;
exports.tpl = tpl;