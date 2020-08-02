#! /usr/bin/env node

// 解析用户参数

const commander = require("commander");
const packageJson = require("../package.json");
const Server = require("../server");

let config = {
    port: 3000,
    host: "127.0.0.1",
    dir: process.cwd()
}

commander
    .version(packageJson.version)
    .option("-p, --port <n>", "set http-server port")
    .on("--help", function(){
        console.log("\r\nExamples");
        console.log("   this is test");
    })
    .parse(process.argv);

// console.log(commander.port);

config = {...commander, ...config};

let server = new Server(config);
server.start()

