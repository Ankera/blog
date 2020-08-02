const http = require("http");

let server = http.createServer((req, res) => {
    let core = req.headers["user-agent"];
    if (core.includes("Android")) {
        res.statusCode = 302;
        res.setHeader("Location", "https://recruit.daily.yungu-inc.org");
        res.end();
    } else {
        res.statusCode = 302;
        res.setHeader("Location", "https://www.baidu.com/");
        res.end();
    }
});

server.listen(3005, () => {
    console.log("start success");
})