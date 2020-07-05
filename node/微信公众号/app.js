const Koa = require("koa");
const wechat = require("./wechat-lib/middleware");
const config = require("./config/config");
const reply = require("./wechat/reply");

const app = new Koa();

app.use(wechat(config, reply.reply));

app.listen(config.port, () => {
    console.log("server start");
});
