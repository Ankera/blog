const fs = require("fs");
const EventEmitter = require("events");
const path = require("path");

class ReadStream extends EventEmitter {
    constructor(p, options = {}) {
        super();
        this.path = path.resolve(__dirname, p);
        this.flags = options.flags || "r";
        this.mode = options.mode || 0o666;
        this.encoding = options.encoding || null; // 默认 buffer
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end;
        this.highWaterMark = options.highWaterMark || 1024 * 64;

        this.pos = this.start; // 读取文件偏移指针

        this.flowing = options.flowing || false; // 默认是非流模式

        this.open(); // 默认直接打开文件

        // 监听用户调用 data 事件，就开始读取文件
        this.on("newListener", type => {
            if (type === "data") {
                this.flowing = true;
                this.read();
            }
        })
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit("error", err);
            }

            this.fd = fd;
            this.emit("open", fd);
        })
    }

    pause() {
        this.flowing = false;
    }

    resume() {
        this.flowing = true;
        this.read();
    }

    close() {
        fs.close(this.fd, () => {
            this.emit("close");
        })
    }

    read() {
        if (typeof this.fd !== "number") {
            return this.once("open", this.read);
        }

        // 读取文件，分配内存
        let buffer = Buffer.alloc(this.highWaterMark);

        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;
        fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (err) {
                return this.emit("error", err);
            }

            if (bytesRead) {
                this.pos += bytesRead;
                this.emit("data", buffer.slice(0, bytesRead));
                if (this.flowing) {
                    this.read();
                }
            } else {
                this.emit("end");
                if (this.autoClose) {
                    this.close();
                }
            }
        })
    }

    pipe(ws) {
        this.on("data", chunk => {
            let flag = ws.write(chunk);
            if (!flag) {
                this.pause();
            }
        });

        ws.on("drain", () => {
            this.resume();
        })
    }
}


// 测试
let rs = new ReadStream("./sum.js", {
    flags: "r",
    encoding: null, // 默认就是buffer
    mode: 0o666,
    autoClose: true,
    start: 0,
    end: 4,
    highWaterMark: 3,
})

rs.on("open", fd => {
    console.log("文件打开了", fd);
})

let arr = [];
rs.on("data", data => {
    arr.push(data);
    console.log("-----")
    rs.pause();
});

setTimeout(() => {
    // rs.resume();
}, 1000)

rs.on("end", () => {
    console.log("over", Buffer.concat(arr).toString());
})

rs.on("close", () => {
    console.log("文件关闭了");
})

rs.on("error", () => {
    console.log("出错了")
})

module.exports = ReadStream;
