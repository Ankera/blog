let Koa = require("./koa");

let app = new Koa();

app.use(async (ctx, next) => {
    // 原生
    console.log("1.原生", ctx.req.method);
    console.log("1.原生", ctx.request.req.method);

    // 封装
    console.log("2.封装", ctx.request.path);
    console.log("2.封装", ctx.path);

    // console.log("1112 start");
    ctx.body = {
        name: "Tom"
    };
    // console.log("1112 end");

    // await next();
});

// koa.use(async (ctx, next) => {
//     console.log("2222 start");
// });

app.listen(3000, () => {
    console.log("server koa success");
})