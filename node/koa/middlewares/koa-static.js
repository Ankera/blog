const path = require("path");
const fs = require("fs").promises;
const ejs = require("ejs");
const template = `
    <title>目录内容</title>
        <style>
        ul li {
            list-style: none;
            margin-bottom: 12px;
        }
        ul li span{
            margin-right: 6px;
        }
        </style>
    <ul>
    <% arr.forEach((item, index) => { %>
        <li><span><%= index + 1 %>、</span><a href="<%=item.href%>"><%= item.content %></a></li>
    <%}) %>
    </ul>
`;

module.exports = (dirname) => {
    return async (ctx, next) => {
        let absPath = path.join(dirname, ctx.path);
        try {
            let statObj = await fs.stat(absPath);
            if (statObj.isFile()) {
                ctx.body = await fs.readFile(absPath, "utf8");
            } else {
                
                let dirs = await fs.readdir(absPath);

                let href = `http://${ctx.headers.host}`;
                dirs = dirs.map(dir => ({
                    href: href + path.join(ctx.url, dir),
                    content: dir
                }))
                let str = ejs.render(template, {
                    arr: dirs
                });

                ctx.set("Content-Type", `text/html;charset=utf8`);
                ctx.body = str;
            }
        } catch (error) {
            // 文件不存在
            await next();
        }
    }
}