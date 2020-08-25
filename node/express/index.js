/**
 * 内部不是es6的写法， 是用构造函数，异步处理，迭代，都是通过回调的方式
 */

let express = require("./express");

let app = express();

// app.param("id", function (req, res, next, value, key) {
//     req.params.id = Number(value) + 10;
//     next();
// })

// app.param("name", function (req, res, next, value, key) {
//     req.params.name = Number(value) + "PX";
//     next();
// })

// app.get("/update/:id/:name", (req, res, next) => {
//     res.end(JSON.stringify(req.params));
// })

app.use(function (req, res, next) {
    req.a = 1;
    let flg = Math.random() > 0.5;
    // if (flg) {
    //     // return next("express error ...");
    //     return next();
    // }
    next();
})

// app.get("/test", (req, res, next) => {
//     req.a++;
//     console.log(111333, req.a)
//     // res.end("ok hello world !!!!");
//     next();
// }, (req, res, next) => {
//     // req.a++;
//     console.log(222)
//     res.end("ok hello world ggg")
//     next();
//     console.log(444)
// }, (req, res, next) => {
//     console.log(333, req.a, "---aaa---")
//     res.end("ok hello world GG");
//     next();
// })

// app.get("/", (req, res, next) => {
//     console.log("/11");
//     res.end("ok hello world");
//     // next("express error ...11");
//     next();
// });

app.get("/name/:id/:name", (req, res, next) => {
    console.log(req.params)
    res.end("ok id name -> " + req.params.id + " -- " + req.params.name);
});

// app.use((err, req, res, next) => {
//     res.end(err);
// })

// app.post("/update", (req, res, next) => {
//     res.end("update hello world..update hello world")
// })

app.listen(3000, () => {
    console.log("server start")
})