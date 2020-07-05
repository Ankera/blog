## 概念梳理

1. 我们为什么需要状态管理？

   ```
   1. react 本身是一个视图view层框架，并不提供数据共享功能，导致一个问题，多组件传递数据时，或者多组件共享数据时要通过 props 来回传递，比较麻烦。
   2. redux的主要优势之一，帮助开发者处理应用层的数据共享状态。
   3. redux三大原则
   	a.	单一数据源
   		整个应用的state被存储在一颗 object tree 中，并且这个 object tree只存储在唯一一个 store 中。运用 观察者模式，当一触发 dispatch 时，对应有关联的数据会自动更新，而不是手动更新或者考虑层层传递 props；
   	b.	state 是只读的
   		唯一改变 state 的方法是触发 action，action 是一个用于描述已发生事件的普通对象，具有 type 属性，确保 view 层和网络层不能直接修改 state， 数据集中化处理；
   	c. 使用纯函数来执行修改
   		多个 reducer 可以合并一个大的 reducer，集中管理纯函数。
   		
   redux = reducer + flux
   ```

2. reudx设计思想

   ```
   1. redux 将整个应用状态存储到一个地方，称为store
   2. 里面保存一颗状态树 state tree
   3. 组件可以派发 dispatch 行为 action 给 store， 而不是直接通知其他组件
   4. 其他组件可以订阅 subscirbe 中的状态
   
   action			转发action				   传入state，acton	
   creators		--------->		store		---------------> reducers
   								  |			<---------------
   								  |			得到新的newState
   								  |
   								  |state变化重新渲染
   								  V
   								渲染视图UI
   ```

3. redux数据流向

   ```
   1. 把数据放在公用区域 store
   
   createStore 函数返回store，就像一个黑匣子，只返回特定的方法，保证数据安全，稳定性
   
   dispatch(action) --触发--> reducer(state, action) --得到--> state ----> subscribe订阅时会自动触发 ----> view视图更新
   
   ```

   

4. Redux-thunk 

    ```
    1. redux-saga 是一个 redux 的中间件，而中间件的作用是为 redux 额外的功能
    2. 在 reducers 中所有的操作都是同步的并且是纯纯的，即 reducer 是纯函数，纯函数是指一个函数的返回结果只依赖于它的参数，并且执行过程中不会对外部产生副作用，即给传什么，就返回什么
    3. 但是在实际应用中，我们希望一些异步的操作(ajax) 且不纯粹的操作(如改变外部的状态), 这些在函数式编程范式中称为“副作用”
    
    redux-saga 就是用来处理上述副作用的一个中间件，它是一个接受事件，并且可能触发新事件的过程管理者，为你的应用管理复杂的流程
    
    
    redux-saga 的工作原理
    1. sagas 采用 Generator 函数 yield Effects (包含指令的文本对象)
    2. Generator 的函数作用是可以暂停的，再次执行的时候从上次暂停的地方继续执行
    3. Effect 是一个简单的对象，该对象包含了一些给 middleware 解释执行的信息
    4. 你可以通过使用 effects API 的call, apply, put, take, takeEvery, fork等方法
    ```

5. Redux-thunk 与 redux-saga 对比

    ```
    
    ```

    

6. 参考

    [链接](https://zhuanlan.zhihu.com/p/50247513)