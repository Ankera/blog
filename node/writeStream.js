const fs = require("fs");
const EventEmitter = require("events");
const path = require("path");

class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    _node(index) {
        if (index < 0 || index > this.size) {
            throw new Error("Beyond the boundary")
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    add(index, element) {
        if (arguments.length === 1) {
            element = index;
            index = this.size;
        }
        if (index < 0 || index > this.size) {
            throw new Error("Beyond the boundary");
        }
        if (index === 0) {
            let head = this.head;
            this.head = new Node(element, head);
        } else {
            let prevNode = this._node(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }

        this.size++;
    }

    get(index) {
        this._node(index);
    }

    set(index, element) {
        let node = this._node(index);
        node.element = element;
    }

    remove(index) {
        let node = null;
        if (index === 0) {
            node = this.head;
            if (!node) {
                return undefined;
            }
            this.head = node.next;
        } else {
            let prevNode = this._node(index - 1);
            node = prevNode.next;
            prevNode.next = node.next;
        }
        this.size--;
        return node;
    }

    clear() {
        this.element = null;
        this.size = 0;
    }
}

// 以队列的形式来方便操作
class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    enQueue(data) {
        this.linkedList.add(data);
    }

    deQueue() {
        return this.linkedList.remove(0);
    }
}

class WriteStream extends EventEmitter {
    constructor(p, options = {}) {
        super();
        this.path = path.resolve(__dirname, p);
        this.flags = options.flags || "w";
        this.encoding = options.encoding || "utf8"; // 默认 buffer
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 1024 * 64;

        this.needDrain = false; // 是否需要触发 drain 事件
        this.offset = this.start; // 写入的偏移量

        this.cash = new Queue(); // 缓存
        this.len = 0; // 正在写入的个数
        this.writing = false; // 默认不是正在写入

        this.open();
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.emit("error", err);
            }

            this.fd = fd;
            this.emit("open", fd);
        })
    }

    write(chunk, encoding, cb) {
        // chunk 是不同类型的字符，比如汉字，要统一转换 buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

        this.len += chunk.length;

        let flag = this.len < this.highWaterMark;

        // 当达到预期或超出highWaterMark时，调用 drain 事件
        this.needDrain = !flag;

        // 开始写入数据, 写入到缓存里面
        if (this.writing) {
            this.cash.enQueue({
                chunk,
                encoding,
                cb
            })
        } else {
            // 真实写入到文件中
            this.writing = true;
            this._write(chunk, encoding, () => {
                cb();

                // 清空缓存, 把缓存中的数据写入真实文件中
                this.clearBuffer();
            });
        }

        return flag;
    }

    clearBuffer() {
        let data = this.cash.deQueue();
        // 开始清空缓存
        if (data) {
            let { chunk, encoding, cb } = data.element;
            this._write(chunk, encoding, () => {
                cb();

                // 直到取不出数据为止
                this.clearBuffer();
            });
        } else {
            // 重置操作
            this.writing = false;
            if (this.needDrain) {
                this.needDrain = false;
                this.emit("drain");
            }
        }
    }

    _write(chunk, encoding, cb) {
        if (typeof this.fd !== "number") {
            return this.once("open", () => this._write(chunk, encoding, cb));
        }

        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            if (err) {
                return this.emit("error", err);
            }
            this.offset += written;
            this.len -= written;
            cb();
        })
    }
}

module.exports = WriteStream;


// 测试
let ws = new WriteStream("./name.txt", {
    flags: "w",
    encoding: "utf8",
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 3
});

// 多个异步操作，会排队，依次调用
ws.on("open", fd => {
    console.log("文件打开了", fd);
})

let w1 = ws.write("1", "utf8", () => {
    console.log("ok1")
});
console.log(w1)

let w2 = ws.write("2", "utf8", () => {
    console.log("ok2")
})

console.log(w2)

let w3 = ws.write("3", "utf8", () => {
    console.log(222)
})

console.log(w3)