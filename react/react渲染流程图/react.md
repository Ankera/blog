### Fiber 架构思想
   这几天刷题的过程，大家也可以感受一下，递归的过程是不好暂停中断的，但是链表的遍历过程，可以随时暂停，只需要记住当前的节点 随时next即可，虚拟dom的变化也是这样，React16之前的架构，props.children是一个数组，递归遍历初difff，但是没法中断，如果diff时间计算过长，会造成卡顿， 所以fiber架构改成了=>firstChild=>slibing的链表形式， diff过程可以随时中断和恢复 ，大家可以体会一下

### React
    
 1. **ReactElement** ，React组件标签

 2. 降低优先级 **ConcurrentMode**
    提高优先级 **flushSync**

 3. **Suspense**
    **lazy**

 4. **children**

 5. **ReactDom**
   ##### 创建更新的方式
   5.1 ReactDom.render() || hydrate 传入的第一个参数就是 FiberRoot 节点
   5.2 setState 
   5.3 forceUpdate


   ##### ReactDom.render()
   先创建 ReactRoot 一个对象，
   在创建 FiberRoot 和 RootFiber
   创建一个更新

 6. 什么是**Fiber**
   每一个 ReactElement 对应一个 Fiber 对象，
      a.记录节点的各种状态
      b.串联整个应用形成树结构
   比如: state, props, 都记录到 Fiber 对象上，
   更新之后才把对应的属性(state, props) 放到 Fiber 对象上

   fiber调度逻辑
   我们有了调度逻辑，之前的 vdom 结构是一个树形结构，他的 diff 过程时
   没有办法中断的，为了管理我们 vdom 树之间的关系，我们需要把树形结构内部
   关系，改造成链表(方便终止)，之前只是一个 children 作为一个数组递归遍历，
   现在 父=>子，子=>父，子=>兄弟, 都有关系
   
   整个任务从render开始，然后每次只遍历一个小单元，一旦被打断，就会去执行
   优先级高的任务(用户交互，动画)回来后，由于回来的元素知道父，子，兄弟元素关系，
   很容易恢复遍历状态

 7. **setState** & **forceUpdate**
 给节点的 Fiber 创建更新
 setState 更新原理
 setState 本身方法是同步的，在调用过程中，会执行 batchedUpdate，读取所有 updateQueue, 也就是我们传入 setState 里面的函数，当读取完只有， 在 执行 performSyncWork 里面会调和 所有的 updateQueue(也就是合并对象，更新数据，即同对象，以最后一个为准)

 7.1 被 ConcurrentMode 组件包裹的都是低优先级的任务
 7.2 import { flushSync } from 'react-dom'; 来提高优先级
     备注: expirationContext = Sync; // 同步模式

 8. **ref**三种使用方式
 ref 字符串
 React.createRef()

 9. **ReactScheduler**核心
 维护时间片
 模拟 requestIdleCallback
 调度列表和超时判断

 10. **ConcurrentMode**
 优势: 让react整体的渲染过程能够进行优先级排比，并且渲染过程可以中断的，它就是可以进行任务调度，把更多的CPU资源给更高级优先级的任务

 11. **Suspense** **Lazy**
 异步数据加载组件

 12. **ComponentDidCatch() 声明周期可以捕获错误
     static getDerivedStateFromError 一旦有错误，就可以捕获

 13. React.memo 让函数组件也有 PureComponent 的功能

 14. 组件复合 -- composition -- this.props.children

 15. redux-thunk 和 redux-saga 的区别
     a. 都是对 redux 做异步处理
        thunk 有点破坏 redux 原理， redux 派发的是一个对象，而 thunk 派发的是函数或对象
     b. 
 

### Flow 
 1. 官网:[链接](https://zhenyong.github.io/flowtype/docs/getting-started.html#_)


### VDOM
 1. 什么是虚拟DOM
 由于浏览器的标准过于复杂，用js对象来描述原生DOM对象
 2. 虚拟DOM如何新建


### 相关链接
1. react源码分享[链接](https://segmentfault.com/a/1190000018891454?utm_source=tag-newest)

2. 有符号和无符号[链接](https://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)