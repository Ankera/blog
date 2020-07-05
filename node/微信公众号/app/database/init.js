const mongoose = require("mongoose");
const { resolve } = require("path");
const glob = require("glob");

mongoose.Promise = global.Promise;

exports.initSchema = function () {
    glob.sync(resolve(__dirname, "./schema", "**/*.js")).forEach(require);
}

exports.connect = function (db) {
    return new Promise((resolve, reject) => {
        mongoose.connect(db);
        mongoose.connection.on("disconnect", () => {
            console.log("数据库挂了")
        });
        mongoose.connection.on("error", error => {
            console.log("数据库出问题了", error);
        });
        mongoose.connection.on("open", () => {
            resolve();
            console.log("mongoose start");
        });
    })
}