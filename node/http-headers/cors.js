// 跨域

const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // 允许自定义头
    res.setHeader("Access-Control-Allow-Headers", "Authoriztion");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Max-Age", 10); // 最大时间
    if (req.method === "OPTIONS") {
        return res.end("OPTIONS"); // 只是试探有没有起作用
    }

    if (pathname === "/user") {
        return res.end(JSON.stringify({ name: "Tom" }))
    }

    const absPath = path.join(__dirname, pathname);
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            res.statusCode = 404;
            res.end("404");
            console.log(err);
        }

        if (statObj.isDirectory()) {
            res.end("directory");
        } else {
            fs.createReadStream(absPath).pipe(res);
        }
    })
});


server.listen(3003, () => {
    console.log("start cors success");
})