## 浏览器工作原理
1. 基础篇

   1. 为什么说JAVASCRIPT是单线程的

      因为JAVASCRIPT引擎是运行在渲染引擎的主线程上的。

   2. `setTimeout` 延迟队列在c语言里面实现的是以 `hashMap` 的结构来实现的。

   3. 网络进程每次给 8K 字节流 给 渲染进程

   4. JAVASCRIPT 只要去取 offsetWidth 就会引起 layout

2. #### 进阶篇

   1. IPC通信

