const sha1 = require("sha1");
const getRawBody = require("raw-body");
const util = require("./util");

module.exports = (config, reply) => {
    return async (ctx, next) => {
        const {
            signature,
            timestamp,
            nonce,
            echostr
        } = ctx.query;
        console.log("参数列表22");
        console.log(ctx.query);

        let str = [config.wechat.token, timestamp, nonce].sort().join("");
        const sha = sha1(str);

        if (ctx.method === "GET") {
            if (sha === signature) {
                ctx.body = echostr;
            } else {
                ctx.body = "error";
            }
        } else if (ctx.method === "POST") {
            if (sha !== signature) {
                ctx.body = "failed";
            }

            const data = await getRawBody(ctx.req, {
                length: ctx.length,
                limit: "1mb",
                encoding: ctx.charset
            });

            const content = await util.parseXML(data);
            const message = await util.formatMessage(content.xml);

            ctx.weixin = message;

            await reply.apply(ctx, [ctx, next]);

            const ctxBody = ctx.body;
            const xml = util.tpl(ctxBody, message);

            console.log("xml......xml");
            console.log(xml);
            ctx.status = 200;
            ctx.type = "application/xml";
            ctx.body = xml;
        }
    }
}