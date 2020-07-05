## 概念

1. 高阶函数

   ```
   aop 	偏函数		函数柯里化
   ```

2. Export 和 export default 区别

   

3. 函数柯里化

   1. 当一个函数有多个参数 的时候先传递一分部分参数调用它（这部分参数以后基本不变）；

   2. 然后返回一个新的函数接收剩余的参数，返回结果；

   3. 让函数变的更加灵活，让函数的粒度更小；

   4. 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能。

      总结：把一个函数的参数范围缩小，反柯里化，把一个函数的参数范围放大。

      ```javascript
      function curry(func) {
          return function curryFn(...args) {
              if (args.length < func.length) {
                  return function () {
                      return curryFn(...args.concat(Array.from(arguments)));
                  }
              } else {
                  return func(...args);
              }
          }
      }
      
      function getSum(a, b, c) {
          return a + b + c;
      }
      
      var c = curry(getSum);
      console.log(c(1, 2, 3));
      console.log(c(1)(2, 3));
      console.log(c(1, 2)(3));
      ```

4. 函数组合

   1.   Lodash 中 flowRight 原理

      ```javascript
      // 把一个字母中的首字母提出出来，并转换大写，使用 . 分隔符
      const fp = require("lodash/fp");
      const str = "world wild web";
      const firstLetterToUpper = fp.flowRight(fp.join(". "), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(" "));
      ```

5. 函数切片 aop

   在编写js的时候，我们有时会遇到针对某种场景做处理，比如在方法开始的时候校验参数，执行方法前检查权限，或是删除前给出确认提示等等。这些校验方法、权限检测、确认提示，规则可能都是相同的，在每个方法前去调用，显得麻烦，而且不利于统一管理，基于此，可以使用面向切面编程（AOP）。[参考](https://www.cnblogs.com/zengyuanjun/p/7429968.html)

   ```javascript
   Function.prototype.before = function (callback) {
       let self = this;
       return function () {
           callback && typeof callback === "function" && callback();
           self();
       }
   }
   
   Function.prototype.after = function (callback) {
       let self = this;
       return function () {
         	self();
           callback && typeof callback === "function" && callback();
       }
   }
   
   function say() {
       console.log("say hello");
   }
   
   let newSay = say.before(() => {
       console.log("new Say");
   });
   newSay();
   ```

   

6. 回调函数

   ```
   1. callback 多个请求并发，不好管理，链式调用，导致回调嵌套过多
   2. promise 优点，可以优雅地处理异步，处理错误，基于回调，还是会有嵌套
   	then的原理，发布订阅
   	defer 实现延时对象，减少回调嵌套
   	优点: 
   		a. 避免回调地狱，采用链式调用
   		b. catch 实现捕获错误
   3. generator + co 让代码支持同步，但不支持 try catch
   4. async await 异步解决，同时支持 try catch
   ```

7. Object

   ```
   Object.create
   Object.assign
   ```

8. 宏任务&微任务

   ```
   宏任务：
   	setimmidate
   	MessageChannel
   		https://zhuanlan.zhihu.com/p/37589777
   	setTimeout
   	主代码执行的时候
   	UI线程
   	
   微任务：
   1. promise.then
   2. mutationobserver
   3. webwork
   4. defer async
   5. nextTick
   ```

9. node的事件环和浏览器事件环的区别

   ```
   基本一致
   
   但是node是分阶段
   timer -> poll -> check (每执行一个宏任务，就会清空微任务)
   ```

10. node 模块的加载实现

   ```
   
   ```

11. 贪心算法

12. MutationObserver

13. npm应用

    ```
    
    ```

14. forEach, for, map, for...in, for...of

15. 纯函数

    1. 相同的输入会有相同的输出

       好处:

       a. 可缓存，因为纯函数对相同的输入始终有相同的输出结果，所以可把纯函数的结果缓存起来.

