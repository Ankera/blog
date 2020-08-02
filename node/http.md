#### NODE 中http相关知识

1. ##### HTTP特点

2. ##### HTTP 请求头

   1. s

3. ##### 发送delete 时， 会提前发送 options 请求

   

4. ##### Node javascript 单线程实例demo

   ```javascript
   const http = require("http");
   
   let server = http.createServer((req, res) => {
       if (req.url === "/sum") {
           let sum = 0;
           for (let i = 0; i < 10000000000; i++) {
               sum += i;
           }
           res.end(sum + "");
       } else {
           res.end("ok")
       }
   })
   
   server.listen(3001, () => {
       console.log("server success");
   })
   
   // 同时访问以下两个，同步处理情况下
   // a. http://127.0.0.1:3001/sum   
   // b. http://127.0.0.1:3001
   // 只有当 a 计算返回结果了， b 才会有返回结果； 如果 a 未返回结果，访问 b 时，则处于加载请求状态 
   ```

5. ##### Node 中间层处理数据， a.js 是服务端， b.js 是中间层，中间层不涉及跨域问题

   ```javascript
   // a.js
   const http = require("http");
   let server = http.createServer((req, res) => {
       res.end(JSON.stringify({"name": "Tom"}))
   })
   server.listen(3001, () => {
       console.log("server success1");
   })
   
   
   // b.js
   const http = require("http");
   const options = {
       port: 3001,
       hostname: "localhost",
       pathname: "/test",
       method: "post"
   }
   let server = http.createServer((request, response) => {
       let client = http.request(options, function(res){
           let arr = [];
           res.on('data', chunk => {
               arr.push(chunk);
           })
           res.on('end', () => {
               // 服务器数据
               let data = Buffer.concat(arr).toString();
               // node 中间层加工处理
               data = JSON.parse(data);
               data.age = 10086;
               data.type = true;
               response.end(JSON.stringify(data));
           })
       });
   
       client.end(null);
   })
   server.listen(3003, () => {
       console.log("server success2");
   })
   ```

   

