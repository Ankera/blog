// 深度优先遍历
function rmdirDFS(p) {
    try {
        let statObj = fs.statSync(p);
        if (statObj.isDirectory()) {
            let dirs = fs.readdirSync(p);
            dirs.forEach(dir => {
                let current = path.join(p, dir);
                rmdir(current);
            });
            fs.rmdirSync(p);
        } else {
            fs.unlinkSync(p);
        }
    } catch (error) {
        console.log(error);
    }
}

// 广度优先遍历
function rmdirBFS(p) {
    let arr = [p];
    let index = 0;
    let current;
    while (current = arr[index++]) {
        let statObj = fs.statSync(current);

        if (statObj.isDirectory()) {
            let dirs = fs.readdirSync(current);
            dirs = dirs.map(d => path.join(current, d));
            arr = [...arr, ...dirs];
        }
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        let sObj = fs.statSync(arr[i]);
        if (sObj.isDirectory()) {
            fs.rmdirSync(arr[i]);
        } else {
            fs.unlinkSync(arr[i]);
        }
    }
}

// 异步DFS
function rmdirAsyncDFS(p, cb) {
    fs.stat(p, function (err, statObj) {
        try {
            if (statObj.isDirectory()) {
                fs.readdir(p, function (error, dirs) {
                    dirs = dirs.map(dir => path.join(p, dir));
                    let index = 0;
                    function next() {
                        if (index === dirs.length) {
                            return fs.rmdir(p, cb);
                        }
                        let current = dirs[index++];
                        rmdirAsyncDFS(current, next);
                    }

                    next();
                })
            } else {
                fs.unlink(p, cb);
            }
        } catch (error) {
            console.log("文件 不存在")
        }
    })
}


// 异步BFS
function rmdirAsyncBFS(p, cb) {
    fs.stat(p, function (err, statObj) {
        try {
            if (statObj.isDirectory()) {
                fs.readdir(p, function (error, dirs) {
                    dirs = dirs.map(dir => path.join(p, dir));
                    let index = 0;
                    if (dirs.length === 0) {
                        return fs.rmdir(p, cb);
                    }

                    function done() {
                        index++;
                        if (index === dirs.length) {
                            fs.rmdir(p, cb);
                        }
                    }

                    for (let i = 0; i < dirs.length; i++) {
                        // 并发删除
                        rmdirAsyncBFS(dirs[i], done);
                    }
                })
            } else {
                fs.unlink(p, cb);
            }
        } catch (error) {
            console.log(error)
        }
    })
}