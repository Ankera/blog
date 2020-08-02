const net = require("net");
const socket = net.Socket();

// 客户端连接服务器
socket.connect(3003, "localhost");

socket.on("connect", function () {
    socket.write("hello");
})

socket.on("data", function (data) {
    console.log(data.toString(), "client");
})