const config = require("../config/config");
const Wechat = require("../wechat-lib/index");

const wechangConfig = {
    wechat: {
        appID: config.wechat.appID,
        appSecret: config.wechat.appSecret,
        token: config.wechat.token,
        // getAccessToken: async () => {
            
        // },
        // saveAccessToken: async data => {
            
        // }
    }
};

// (async function () {
//     const client = new Wechat(wechangConfig.wechat);
//     const data = await client.getAccessToken();
//     console.log("获取token...");
//     console.log(data);
// })();

exports.getWechat = () => new Wechat(wechangConfig.wechat);

