#### context 用法
 1. 很多优先的React组件都通过 Context 来完成自己的功能，
  比如 react-redux 的 <Provier />, 就是通过 Context提供一个全局的 store。
  比如路由组件 react-router 通过 Context 管理路由状态等。
  比如 react-dnd 通过 Context 在组件中分发 DOM 的 Drag 和 Drop 事件。


#### 服务端渲染
 1. 为什么要用服务端渲染
 https://www.zhihu.com/question/59578433

 2. 什么是同构 
 一套代码在客户端执行一次， 在服务端执行一次

 3. 中间层

 4. 启动多个命令
 npm-run-all --parallel dev:**
  