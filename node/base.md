## 概念

1. 常见问题 [链接](https://juejin.im/post/5d5639c7e51d453b5c1218b4)

   ```
   1. require 的运行机制和缓存策略你了解吗？
   2. require 加载模块的是同步还是异步？谈谈你的理解
   3. exports 和 module.exports 的区别是什么？
   4. require 加载模块的时候加载的究竟是什么？
   
   commonJS 与 ES6 加载区别
   	modulex.exports 属性可以作为对象
   	export default 静态加载
   ```

2. 进程和线程 [链接](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)

3. express， koa区别

   ```
   中间件的区别 koa基于promise
   
   express内置路由， koa基于中间件
   express静态文件static， koa基于koa-static
   
   body-parser 	koa-bodyparser
   
   express 中间件的原理 koa 中间件的原理
   ```

4. 中间件的特点

   ```
   权限校验，可以决定是否继续向下执行
   中间可以扩展属性和方法
   ```

5. nrm, npm,nvm

   ```
   nrm 切换源头 npm cnpm ... 全局安装
   nrm use npm 
   nrm ls
   ```

6. Node.js 模块上下文会被污染吗？[链接](https://www.jianshu.com/p/f3ce0c4ba622)

7. events [链接](https://juejin.im/post/5d69eef7f265da03f12e70a5)

8. node中http

   ```
   1. 多语言 Accept-language zh-CN,zh;q=0.9,en;q=0.8
   2. 范围请求，206 Range="bytes=0-10" 获取某部分数据
   3. 防盗链 限制用户发请求的网站，来源 referer(可以伪造的) + 验证码
   4. gzip压缩，Accept-encoding，gzip, deflate, br
   5. 强制缓存 Cache-Control max-age Expires
   	Last-Modified 		if-modified-since
   	Etag			    if-none-match
   6. host
   7. 正向代理，反向代理， 
   	中间代理靠近客户端，就是正向代理，访问外网，我需要挂一个代理访问，客户知道代理存在
   	中间代理靠近服务端，就是反向代理，访问某个网站前，会先判断，跳转到指定的网站，客户端不知道代理的存在
   ```

   