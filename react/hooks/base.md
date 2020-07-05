

## 概念

1. ##### hooks解决的问题

   1. 在组件之间复用状态逻辑很难，可能要用到render props 和高阶组件，React需要为共享状态逻辑提供更好的原生路径，Hook使你在无需修改组件结构的情况下复用状态逻辑
   2. hook将组件中相互关联的部分拆分成更小的函数
   3. 取消了this

2. ##### 注意事项

   1. 只能在函数最外层调用hook，不要在循环，条件判断或子函数中调用
   2. 只能在 react 的函数组件中调用hook，不要在其他 JAVASCRIPT 函数中调用

3. ##### useState

   1. 每一次渲染都有它自己的 props 和 state
   2. 每一次渲染都有它自己的事件处理函数


   3. 函数式更新

     ```
     let [number, setNumber] = useState(0);
     setNumber(number+1);
     
     setNumber(nummber => number+1);
     ```


​     


   4. 惰性初始化
     a. initState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略
     b. 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，
     此函数只在初始渲染时被调用
     c. 与class组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式 setState
     结合展开运算符来达到合并并更新对象的结果


​     

4. ##### Hooks 的性能优化

   1. 调用 state hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。
       react 使用 object.is  比较算法来比较 state

     ```
      object.is  方法判断两个值是否是相同的值, 来控制新状态是否更新
     ```

     

   2. 减少渲染次数

     1. 把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新

        1.  `memo` 功能类似 `shouldComponentUpdate`， 把组件作为参数传递给 memo之后，就会返回个新的组件，新组件有了一个功能，如果属性不变，则不重新渲染

           ```
           SubCounter = memo(SubCounter);
           ```

        2. useMemo, useCallback 依赖项变化会更新

        

     2. 把创建函数和依赖项数组作为参数传入 `useMemo`, 它仅会在某个依赖项改变时才会重新计算 memoized 值，这种优化有助于避免在每次渲染时都进行高开销的计算

5. ##### userReducer

   1. `useState` 的替代方案，它接收一个形如 

      ```
      (state, action) => newState
      ```

      的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法，在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或下一个 state 依赖之前的 state 等。

      ```
      const [ state, dispatch ] = useReducer(reducer, initialArg, init);
      ```

   2. `useContext` 是 `createContext` 的替代方案

      1. 接收一个 context 对象(`React.createContext`的返回值)，并返回该context的当前值
      2. 当前的context值由上层组件中距离当前最近的 <MyContext.Provider/> 提供
      3. `useContext` 相当于class 组件中的 static contextType = MyContext 或者<MyContext.Consumer/>
      4. `useContext` 只是让你能够读取 context 的值以及订阅 context 的变化，你仍然需要在上层组件树中使用 <MyContext.Provider/> 来为下层组件提供 context

6. ##### useEffect

   1. 在函数组件主体内( 这里指在React渲染阶段 ) 改变DOM，添加订阅，设置定时器，记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的bug并破坏UI的一致性；

   2. 使用 `useEffect` 完成副作用的操作，赋值给 `useEffect` 的函数会在组件渲染到屏幕之后执行；

   3. `useEffect` 就是一个 effect hook，给函数组件增加了操作副作用的能力，它和class 组件中的以下生命周期具有相同的功能，只不过合成了一个API

      ```
      componentDidMount, componentDidUpdate, componentWillUnmount
      ```

7. ##### useRef

   1. `createRef` 函数hooks 每次都渲染， `useRef` 只渲染一次,  例子父组件拿到子组件的方法

      ```
      import {useImperativeHandle, forwardRef, useRef} from "react";
      function Child(props, parentRef) {
          const focusRef = useRef();
          const inputRef = useRef();
          // 把子组件方法挂载到父组件上面
          useImperativeHandle(parentRef, () => {
              return {
              	name: "计数器",
                  focus() {
                      focusRef.current.focus();
                  },
                  changeText(text) {
                      inputRef.current.value = text;
                  }
              }
          })
          return (
              <>
                  <input ref={focusRef} />
                  <input ref={inputRef} />
              </>
          )
      }
      
      // 子组件用 forwardRef 包裹一层
      let ForwardChild = forwardRef(Child);
      function Parent() {
          const parentRef = useRef();
          function getFocus() {
              parentRef.current.focus();
              parentRef.current.changeText("Hello Anker");
          }
          return (
              <div>
                  <ForwardChild ref={parentRef} />
                  <button onClick={getFocus}>焦点</button>
              </div>
          )
      }
      ```

8. ##### useLayoutEffect

   1. 其函数签名与 `useEffect` 相同，但它会有所有的DOM变更之后同步调用 effect；

      可以使用它来读取DOM布局并同步触发重渲染；

      在浏览器执行绘制之前 `useLayoutEffect` 内部的更新计划将被同步刷新；

      尽可能使用标准的 `useEffect` 以避免阻塞视图更新

   2. 浏览器是如何呈现一张页面的

      <u>解析HTML，并生成一颗DOM tree；</u>

      <u>解析各种样式结合DOM tree 生成一颗 render tree；</u>

      <u>对 render tree 的各个节点计算布局信息，比如box的位置与尺寸；</u>

      <u>根据 render tree 并利用浏览器的UI层进行绘制</u>

   ```mermaid
    graph LR;
    DOM --> DOMTree
    HTML --> HTMLParser
    HTMLParser --> DOMTree
    			DOMTree --> attachment
    					attachment --> RenderTree
    					Latout	--> RenderTree
    					RenderTree --> Painting
    					Painting --> Display
    			styleSheets --> CSSParser
    			CSSParser --> StyleRules
    			StyleRules --> attachment
   ```
   3. `useLayoutEffect` 执行时机

      ```
      RenderTree --> useLayoutEffect --> Painting
      
      而 useEffect 是在 Display 之后执行
      ```

      示例

      ```
      // 重绘之后调用，
      function UseLaytoutEffect() {
          let [color, setColor] = useState("red");
      
          useEffect(() => {
              console.log("effect color = ", color);
          });
          useLayoutEffect(() => {
              alert("effect color = " + color); // 同步
              console.log("useLayoutEffect color = ", color);
              // 修改样式之类的, 重绘回流区别函数
              document.getElementById("myDiv").style.backgroundColor = color;
          });
          return (
              <>
                  <div id="myDiv" style={{ color }}>颜色</div>
                  <button onClick={() => setColor("red")}>红</button>
                  <button onClick={() => setColor("yellow")}>黄</button>
                  <button onClick={() => setColor("blue")}>蓝</button>
              </>
          )
      }
      ```

      