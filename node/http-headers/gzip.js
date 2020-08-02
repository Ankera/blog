const http = require("http");
const zlib = require("zlib");
const fs = require("fs")

const server = http.createServer((req, res) => {
    const encoding = req.headers["accept-encoding"];
    res.setHeader("Content-Type", "text/html;charset=utf8");
    if (encoding) {
        // gzip, deflate, br
        if (/\bgzip\b/.test(encoding)) {
            res.setHeader("Content-Encoding", "gzip");
            fs.createReadStream("./1.html").pipe(zlib.createGzip()).pipe(res);
            return
        }

        if (/\bdeflate\b/.test(encoding)) {
            res.setHeader("Content-Encoding", "deflate");
            fs.createReadStream("./1.html").pipe(zlib.createDeflate()).pipe(res);
            return
        }

        fs.createReadStream("./1.html").pipe(res);
    } else {
        fs.createReadStream("./1.html").pipe(res);
    }
})

server.listen(3007, () => {
    console.log("start gzip success");
})