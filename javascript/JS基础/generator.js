let fs = require("fs");

let obj1 = {
    0: 1,
    1: 2,
    3: 3,
    length: 3,
    [Symbol.iterator]: function () {
        let self = this;
        let index = 0;
        return {
            next() {
                return {
                    value: self[index],
                    done: index++ === self.length
                }
            }
        }
    }
}

function co(it) {
    return new Promise((resolve, reject) => {
        function next(val) {
            let { value, done } = it.next(val);
            if (done) {
                return resolve(value);
            }
            Promise.resolve(value).then(data => {
                next(data)
            }, reject);
        }

        next();
    })
}

function* read() {
    let r = yield fs.readFile("./test/name.txt", "utf8");
    console.log(r, 'rr')
    let age = yield fs.readFile(r, "utf8");
    let e = yield [age];
    return e;
}

co(read()).then(data => {
    console.log(data);
})

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    })
}