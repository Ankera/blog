const fs = require("fs");

function mkdir(path, callback) {
    let arr = path.split("/");
    let index = 0;
    function next() {
        if (index === arr.length) {
            return typeof callback === "function" && callback();
        }

        let p = arr.slice(0, index + 1).join("/");
        fs.access(p, err => {
            index++;
            if (err) { // 不存在
                fs.mkdir(p, next)
            } else {
                next();
            }
        })
    }
    next();
}

let p1 = "a/b/c";
mkdir(p1, () => {
    console.log("success")
})