module.exports = () => {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let arr = [];
            ctx.req.on("data", chunk => {
                arr.push(chunk);
            })

            ctx.req.on("end", () => {
                ctx.request.body = Buffer.concat(arr).toString();
                resolve(null);
            })
        });

        await next();
    }
}