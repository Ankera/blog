const net = require("net");

let server = net.createServer(function(socket){
    socket.on("data", data => {
        console.log("监听客户端发送的数据", data.toString());
        socket.write("world");
    })

    socket.on("end", () => {
        console.log("end")
    })
})

server.listen(3003, () => {
    console.log("Tcp server success");
})