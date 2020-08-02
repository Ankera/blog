let Koa = require("./koa");

let app = new Koa();

function sleep(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null)
        }, 2000)
    })
}

/**
 * koa中间件执行原理
 * 1. 中间件会以此组合成一个 “大 promise 函数 ”，并且执行完毕后会采用 ctx.body 的结果进行返回
 * 2. 
 */

app.use(async (ctx, next) => {
    console.log("1");
    await next();
    console.log(2);
    ctx.body = "hello1";
});

app.use(async (ctx, next) => {
    console.log("3");
    await sleep();
    console.log(4);
    next();
    ctx.body = "word2";
});

app.use( (ctx, next) => {
    console.log("5");
    next();
    console.log("6");
});

app.listen(3000, () => {
    console.log("server koa success");
})