## 概念

1. react 数据

   ```
   npm i redux-persist
   ```

2. Fiber 16之前

   1. React会递归对比 VDOM，找出需要变动的节点，然后同步更新它们，这个过程成为 `Reconcilation` (协调);
   2. 在 `Reconcilation` 期间，**<u>React 会一直占用浏览器资源</u>**，可能导致用户触发的事件得不到及时响应，也可能会出现掉帧，卡顿。

   3. 递归调用，执行栈越来越深，而且不能中断。

3. Fiber 是什么

   1. fiber 是一个执行单元；

   2. 可以通过调度策略合理分配CPU资源，从而提高用户的响应速度；

   3. 通过Fiber 架构，让自己的 `Reconcilation` 过程可以被中断，适时地让出CPU执行权。

4. fiber 基础架构JSON示意图 & 流程图

   ```javascript
   let root = {
       key: "A1",
       children: [
           {
               key: "B1",
               children: [
                   {
                       key: "C1",
                       children: []
                   },
                   {
                       key: "C2",
                       children: []
                   }
               ] 
           },
           {
               key: "B2"
           }
       ]
   }
   ```

   ![fiber_base](./image/fiber_base.png)

