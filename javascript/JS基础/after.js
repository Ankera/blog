let fs = require("fs");

/**
 * https://www.zhihu.com/question/33515481
 * 
 * 并发，计数器
 * 多少次之后再触发加入的回调函数
 * @param {*} times 
 * @param {*} callback 
 */
function after(times, callback) {
    let result = {};
    return function (key, data) {
        result[key] = data;
        if (--times === 0) {
            callback(result)
        }
    }
}

// 该次数会在所有异步执行完之后再执行
const newFn = after(2, function (result) {
    console.log(result);
})

fs.readFile("./test/name.txt", 'utf-8', (err, data) => {
    if (err) console.log(err);
    newFn('name', data);
});


fs.readFile("./test/age.txt", 'utf-8', (err, data) => {
    if (err) console.log(err);
    newFn('age', data);
});