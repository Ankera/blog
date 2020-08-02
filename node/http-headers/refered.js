const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

/**
 * 防盗链，如果不是本网站的图片，禁止访问，传一个破图
 */
const whiteList = ["localhost:3006"];
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html;charset=utf8");
    fs.stat("." + req.url, function (err, statObj) {
        if (err) {
            res.statusCode = 404;
            res.end("NOT FOUND");
            return;
        }

        if (statObj.isDirectory()) {
            res.end("文件");
        } else {
            let refererHost = req.headers["referer"];
            if (refererHost) {
                refererHost = url.parse(refererHost).host;
                let host = req.headers["host"];
                if (refererHost !== host && !whiteList.includes(refererHost)) {
                    return fs.createReadStream(path.join(__dirname, "/bad.jpg")).pipe(res);
                }
            }
            fs.createReadStream(path.join(__dirname, req.url)).pipe(res);
        }
    })
})

server.listen(3006, () => {
    console.log("start refer success");
})