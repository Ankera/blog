const http = require("http");
const fs = require("mz/fs");
const url = require("url");
const path = require("path");
const mime = require("mime");
const chalk = require("chalk");
const ejs = require("ejs");
const crypto = require("crypto");

class Server {
    constructor(config) {
        this.host = config.host;
        this.dir = config.dir;
        this.port = config.port;
        this.template = fs.readFileSync(path.resolve(__dirname, "template.html"), "utf8");;
    }

    async handleRequest(req, res) {
        try {
            let { pathname } = url.parse(req.url);
            let absPath = path.join(this.dir, pathname);
            let statObj = await fs.stat(absPath);
            if (statObj.isDirectory()) {
                let dirs = await fs.readdir(absPath);

                let href = `http://${this.host}:${this.port}`;
                dirs = dirs.map(dir => ({
                    href: href + path.join(pathname, dir),
                    content: dir
                }))
                let str = ejs.render(this.template, {
                    arr: dirs
                });

                res.setHeader("Content-Type", `text/html;charset=utf8`);
                res.end(str);
            } else {
                this.sendFileEtag(req, res, absPath, statObj);
            }
        } catch (error) {
            // console.log(error);
            this.sendError(res);
        }
    }

    // 强制和时间缓存
    sendFile(req, res, absPath, statObj) {
        // 设置强制缓存
        // res.setHeader("Cache-Control", "max-age=10");
        // res.setHeader("Expires", new Date(Date.now()+10*1000).toUTCString());

        // 对比文件时间
        let clientTime = req.headers["if-modified-since"];
        let servetTime = statObj.ctime.toUTCString();

        if (clientTime && clientTime === servetTime) {
            res.statusCode = 304;
            res.end();
            return;
        }

        // 设置过期时间缓存
        res.setHeader("Last-Modified", servetTime);
        res.setHeader("Cache-Control", "no-cache");

        res.setHeader("Content-Type", `${mime.getType(absPath)};charset=utf8`);
        fs.createReadStream(absPath).pipe(res);
    }

    // 协商缓存
    sendFileEtag(req, res, absPath, statObj) {
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Content-Type", `${mime.getType(absPath)};charset=utf8`);

        let rs = fs.createReadStream(absPath);
        let md5 = crypto.createHash("md5");
        let arr = [];
        rs.on("data", chunk => {
            arr.push(chunk);
            md5.update(chunk);
        });

        rs.on("end", () => {
            // 客户端的标志
            let clientEtag = req.headers["if-none-match"];
            let servetEtag = md5.digest("base64");
            if (clientEtag && clientEtag === servetEtag) {
                res.statusCode = 304;
                res.end();
                return;
            }
            res.setHeader("Etag", servetEtag);
            res.end(Buffer.concat(arr));
        })
    }

    cache(req, res, absPath, statObj) {
        let lastModified = statObj.ctime.toUTCString();
        let modeifiedSince = req.headers["if-modified-since"];

        let etag = String(statObj.size);
        let noneMatch = req.headers["if-none-match"];
        res.setHeader("Cache-Control", "max-age=1000");
        res.setHeader("Last-Modified", lastModified);
        res.setHeader("Etag", etag);

        if (lastModified !== modeifiedSince) {
            return false;
        }
        if (etag !== noneMatch) {
            return false;
        }
        return true;
    }

    sendError(res) {
        res.statusCode = 404;
        res.end("NOT FOUND");
    }

    start() {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, this.host, () => {
            console.log(chalk.yellow("Starting up http-server, serving ") + chalk.blue(`${this.dir}`));
            console.log(chalk.black(`   http://${this.host}`) + chalk.red(`:${this.port}`));
            console.log(chalk.black(`   http://${getIPAdress()}`) + chalk.red(`:${this.port}`));
        });

        server.on("error", () => {

        })
    }
}

function getIPAdress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = Server;