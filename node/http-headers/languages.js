const http = require("http");

const languages = {
    "zh-CN": "你好~~~",
    "en": "hello world",
    "fr": "Bonjour"
};

const defatultLanguage = "zh-CN";

const server = http.createServer((req, res) => {
    let language = req.headers["accept-language"];
    res.setHeader("Content-Type", "text/html;charset=utf8");
    // res.setHeader("Access-Control-Allow-Origin", "*");

    if (language) {
        
        language = language.split(",").map(lan => {
            let [l, q = "q=1"] = lan.split(";");
            return {
                lan: l,
                q: q.split("=")[1]
            }
        }).sort((a, b) => b.q - a.q);

        for (let i = 0; i < language.length; i++) {
            let current = language[i].lan;
            if (languages[current]) {
                res.end(languages[current]);
                return;
            }
        }

        // 没有以上语言，则用默认语言
        res.end(languages[defatultLanguage]);
    } else {
        res.end(languages[defatultLanguage]);
    }
})

server.listen(3004, () => {
    console.log("start success")
})

// 设置请求头
// curl -v --header "Accept-Language:zh-CN;q=0.1,fr;q=0.8,en;q=0.7" http://127.0.0.1:3004/