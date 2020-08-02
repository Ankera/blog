/**
 * 前端HTML
 * 
    <form method="POST" action="/form" enctype="multipart/form-data">
        <input type="text" name="username"> <br><br><br>
        <input type="text" name="password"><br><br><br>
        <input type="file" name="file"><br><br><br>
        <input type="submit" value="提交"><br>
    </form>
 */

// 处理前端上传的二进制文件

const Koa = require("koa");
const fs = require("fs").promises;
const static = require("koa-static");
const path = require("path");
const uuid = require("uuid");

const app = new Koa();

Buffer.prototype.split = function (sep) {
    let arr = [];
    let len = Buffer.from(sep).length;
    let current;
    let offset = 0;
    while ((current = this.indexOf(sep, offset)) !== -1) {
        arr.push(this.slice(offset, current));
        offset = current + len;
    }

    arr.push(this.slice(offset));
    return arr;
}

app.use(static(__dirname));

app.use(async (ctx, next) => {
    if (ctx.path === "/form" && ctx.method.toLowerCase() === "post") {
        await new Promise((resolve, reject) => {
            let arr = [];
            ctx.req.on("data", chunk => {
                arr.push(chunk);
            })

            ctx.req.on("end", () => {
                let fields = {};
                let data = Buffer.concat(arr);
                let boundary = `--${ctx.get("Content-Type").split("=")[1]}`;
                let lines = data.split(boundary).slice(1, -1);
                lines.forEach(async line => {
                    let [head, body] = line.split("\r\n\r\n");
                    head = head.toString();
                    let key = head.match(/name="(.+)"/)[1];
                    if (!head.includes("filename")) {
                        body = body.toString().slice(0, -2);
                        fields[key] = body;
                    } else {
                        // 处理文件
                        let filePath = path.resolve(__dirname, "upload", uuid.v4());
                        let content = line.slice(head.length + 4, -2);
                        fields[key] = filePath;
                        await fs.writeFile(filePath, content);
                    }
                })

                ctx.request.body = fields;
                resolve(null);
            })
        })
        /**
         * 返回示例
         * {"username":"yuyayong.yyy","password":"xiaocai","file\"; filename=\"a.txt":"/Users/yuyayong/Desktop/data/my-koa/upload/b6e468f6-2b05-40e4-8721-539ab71d9c71"}
         */
        ctx.body = ctx.request.body;
    } else {
        ctx.body = "NOT FOUND";
    }
})

app.listen(3001, () => {
    console.log("start success");
})