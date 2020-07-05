## 计算机网络
1. 时间复杂度和空间复杂度


## 浏览器
1. 浏览器建构 [链接](https://ahangchen.gitbooks.io/chromium_doc_zh/content/zh/Start_Here_Background_Reading/Multi-process_Architecture.html)
2. Chromium学习系列 [链接] (https://juejin.im/post/5c7f3e16518825409f76388b)

3. 浏览器渲染[链接](https://juejin.im/post/5d5b4c2df265da03dd3d73e5)

## JAVASCRIPT
1. 变量声明的6种方法[链接](https://blog.csdn.net/weixin_33804582/article/details/91958274)

2. 前端学习整理 [链接](https://www.kancloud.cn/cyyspring/more/1450907)

3. 事件循环 [链接](https://www.bilibili.com/video/av58328816?from=search)

4. createDocumentFragment

5. 冒泡和捕获

6. promise [链接](https://juejin.im/post/5a30193051882503dc53af3c) <br> [链接](https://juejin.im/post/5a0965c9f265da430e4ea8a0#heading-2)

7. promise [链接](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)

8. promise 视频 [链接](https://study.163.com/course/courseLearn.htm?courseId=1209598956#/learn/video?lessonId=1280051451&courseId=1209598956)

9. 函数 [链接](https://juejin.im/post/5c6bbf0f6fb9a049ba4224fd#heading-11)

10. Object.create() 原理

11. canvas

12. 浏览器工作原理 [链接](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)

13. 浏览器工作原理 [链接](https://juejin.im/post/5d86496be51d453bdb1d9c11#heading-3)

14. 设计模式 [链接](https://www.cnblogs.com/tugenhua0707/p/5198407.html)

## 框架
1. dva 设计原理


## 面试
1. 综合面试题[链接](https://juejin.im/post/5d89ac2ff265da03c34c3cd2)

2. 综合面试题[链接](https://juejin.im/post/5ab0da85f265da23866fb9b7)

3. 大文件上传[链接](https://juejin.im/post/5dff8a26e51d4558105420ed#heading-27)

4. 面试[链接](https://juejin.im/post/5e6b05116fb9a07cb83e39c6)

## 数据结构
1. 综合 [链接](https://juejin.im/post/5cd1ab3df265da03587c142a)
2. 综合 [链接](https://juejin.im/post/5d5b307b5188253da24d3cd1)

3. 综合 [链接](https://juejin.im/post/5daeefc8e51d4524f007fb15)


## 算法
1. 算法 [链接](https://juejin.im/post/5ea3b1aa6fb9a03c8027bac2)


## 数据库
1. B+ [链接](https://juejin.im/entry/5b0cb64e518825157476b4a9)


## 源码分析
1. 微任务&宏任务 [链接](https://www.jianshu.com/p/3ed992529cfc)

2. react-router [链接](https://www.bilibili.com/video/BV1zJ411c7TD/?spm_id_from=333.788.videocard.4)

3. vue 手写 [链接](https://www.bilibili.com/video/BV1Ap411d7Ai/?spm_id_from=333.788.videocard.7)

3. MVVM 框架
## 大苹果
1. 综合 [链接](https://github.com/CavsZhouyou/Front-End-Interview-Notebook)


## 软件
1. omni [链接](https://www.macxin.com/archives/10762.html)



2. 柯里化函数

3. MessageChannel

4. css [链接](https://juejin.im/post/5e8fb5b16fb9a03c464934a8)

## node 
1. token session cookie
cookie和session实际上是同一套认证流程，相辅相成。session保存在服务器，cookie保存在客户端。最常见的做法就是客户端的cookie仅仅保存一个sessionID，这个sessionID是一个毫无规则的随机数，由服务器在客户端登录通过后随机生产的。往后，客户端每次访问该网站都要带上这个由sessionID组成的cookie。服务器收到请求，首先拿到客户端的sessionID，然后从服务器内存中查询它所代表的客户端(用户名，用户组，有哪些权限等)。

与token相比，这里的重点是，服务器必须保存sessionID以及该ID所代表的客户端信息。这些内容可以保存在内存，也可以保存到数据库(通常是内存数据库)。

而token则可以服务器完全不用保存任何登录信息。

token的流程是这样的。客户端登录通过后，服务器生成一堆客户端身份信息，包括用户名、用户组、有那些权限、过期时间等等。另外再对这些信息进行签名。之后把身份信息和签名作为一个整体传给客户端。这个整体就叫做token。之后，客户端负责保存该token，而服务器不再保存。客户端每次访问该网站都要带上这个token。服务器收到请求后，把它分割成身份信息和签名，然后验证签名，若验证成功，就直接使用身份信息(用户名、用户组、有哪些权限等等)。

可以看出，相对于cookie/session机制，token机制中，服务器根本不需要保存用户的身份信息(用户名、用户组、权限等等)。这样就减轻了服务器的负担。

我们举个例来说，假如目前有一千万个用户登录了，在访问不同的网页。如果用cookie/session，则服务器内存(或内存数据库)中要同时记录1千万个用户的信息。每次客户端访问一个页面，服务器都要从内存中查询出他的登录信息。而如果用token，则服务器内存中不记录用户登录信息。它只需要在收到请求后，直接使用客户端发过来的登录身份信息。

可以这么说，cookie/session是服务器说客户端是谁，客户端才是谁。而token是客户端说我(客户端)是谁，我就是谁。当然了，token是有签名机制的。要是客户端伪造身份，签名通不过。这个签名算法很简单，就是将客户端的身份信息加上一个只有服务器知道的盐值(不能泄露)，然后进行md5散列算法(这里只是简化，方便理解，实际细节要稍复杂一些)。

cookie/session在单服务器，单域名时比较简单，否则的话，就要考虑如何将客户端的session保存或同步到多个服务器。还要考虑一旦宕机，内存中的这些信息是否会丢失。token因为服务器不保存用户身份，就不存在这个问题。这是token的优点。
token因为服务器不保存用户身份信息，一切都依赖当初那个签名。所以存在被盗用的风险。也就是说一旦盗用，服务器可能毫无办法，因为它只认签名算法。而session机制，服务器看谁不爽，可以随时把他踢出(从内存中删掉)。正是因为如此，token高度依赖过期时间。过期时间不能太长。过期短，可以减少被盗用的风险。

除了上面所说的，我个人认为，如果开发的系统足够小，倾向于使用cookie/session。如果系统同时登录用户多，集群服务器多，有单点登录需求，则倾向于使用token。