## 概念

1. commonJS [链接](https://javascript.ruanyifeng.com/nodejs/module.html#)

2. 模块化的好处 [链接](https://juejin.im/post/5e3985396fb9a07cde64c489#heading-15)

   ```
   命名空间
   可重用性
   可维护性
   ```

   

3. 源码加载

   ```
   require
   
   mod.require
   
   Module._load 模块的加载
   
   Module._resolveFilename 解析文件的名字，获取文件的绝对路径
   
   Module._cache 一个模块的缓存，没有缓存创建模块
   
   new Module(filename, parent) 
   
   Module._cache[filename] = module 缓存模块
   
   tryModuleLoad  尝试加载模块
   
   module.load 加载模块
   
   Module._extensions[] 加载模块， 以此是 .js  .json  .node
   
   module._complete  给模块添加闭包
   
   Module.wrap 包裹
   ```

   

4. require加载顺序

   ```
   require(xxx) 
   
   xxx 会转换成绝对路径
   
   一、优先从缓存加载规则
   二、核心模块，被编译到了二进制文件中，根据文件名加载
   三、路径形式的模块：
   	先加载本地文件， 加载顺序 .js -> .json -> .node
   四、第三方模块，
   	根据 package.json 中的main对应的加载顺序来加载
   	每个模块都有一个 module, module 属性有 paths: 属性
   	
   	类似 paths: [
           '/Users/yuyayong/init/study/my-koa/test/node_modules',
            '/Users/yuyayong/init/study/my-koa/node_modules',
            '/Users/yuyayong/init/study/node_modules',
            '/Users/yuyayong/init/node_modules',
            '/Users/yuyayong/node_modules',
            '/Users/node_modules',
            '/node_modules'
   	] 
   	
   	递归查找是否有对应的模块
   ```

5. require 加载源码机制

   ```
   详见 common.js
   ```

   

6. common.js 与 ES6 加载
   ```
   1. https://juejin.im/post/5badebedf265da0af609bdad
   
   2. https://juejin.im/post/5aaa37c8f265da23945f365c#heading-3
   ```

7. exports 与 module.exports区别 [链接](https://juejin.im/post/5d5639c7e51d453b5c1218b4)

   ```
   exports 只是 module.exports 的一个引用
   
   ```

   