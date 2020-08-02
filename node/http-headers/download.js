const fs = require("fs");
const path = require("path");
const http = require("http");

const DOWNLOAD_FILE = path.resolve(__dirname, "node.txt");

let total = fs.statSync(DOWNLOAD_FILE).size;

let server = http.createServer((req, res) => {
    let range = req.headers["range"];
    res.setHeader("Content-Type", "text/html;charset=utf8");

    if (range) {
        let [, start, end] = range.match(/(\d*)-(\d*)/);
        start = start ? Number(start) : 0;
        end = end ? Number(end) - 1 : total;
        res.statusCode = 206;
        res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`);
        fs.createReadStream(DOWNLOAD_FILE, {
            start,
            end
        }).pipe(res);
    } else {
        fs.createReadStream(DOWNLOAD_FILE).pipe(res);
    }
});

server.listen(3003, () => {
    console.log("start success");
})

// 1.  先启动 node download.js

// 2.  curl -v --header "Range:bytes=0-10" http://localhost:3003

/**
    * Rebuilt URL to: http://localhost:3003/
    *   Trying ::1...
    * TCP_NODELAY set
    * Connected to localhost (::1) port 3003 (#0)
    > GET / HTTP/1.1
    > Host: localhost:3003
    > User-Agent: curl/7.54.0
    > Accept: *//*
    > Range:bytes=0-10
    >
    < HTTP/1.1 206 Partial Content
    < Content-Type: text/html;charset=utf8
    < Content-Range: bytes 0-9/19
    < Date: Tue, 12 May 2020 14:10:09 GMT
    < Connection: keep-alive
    < Transfer-Encoding: chunked
    <
    aaa
    bbb

    * Connection #0 to host localhost left intact
*/