# 概念

1. #### `computed` & `watch` 差异

   1. 都是一个 watcher；
   2. computed计算属性内部不会立马获取值，只有取值的时候才执行，如果有缓存的，依赖数据不发生变化，则不更新结果；
   3. computed计算属性是通过其它值来计算出自己的值；
   4. watch默认会在内部先执行，它要计算出一个老值，如果数据变化会执行回调函数。

2. ##### V-model 本质是语法糖

   ```javascript
   <Son 
   		:value="value"
   		@input="changeValue" />
   			  
   <Son 
   		v-model="value"/>
         
   // 两者等价
   ```

3. ##### 组件之间传递属性和值

   1. props + emit 同步数据，v-model；

   2. $parent, $children 通过实例原型链；

   3. $dispatch 向上派发事件, 子组件调用父组件的方法；

      ```javascript
      Vue.prototype.$dispatch = function(eventName, componentName, value){
          let parent = this.$parent;
          while(parent){
              if(componentName === parent.$options.name){
                  parent.$emit(eventName, value);
                  break;
              }
              parent = parent.$parent;
          }
      }
      
      // 举例
      // Parent --> Son --> Gradson 不经过 Son 直接把 Parent 值传递给 Gradson
      // Parent 
      <div>
        	<Son 
              @eat="eat"
              v-model="val"/>
      </div>
      
      // Gradson // 触发 Parent 父组件的 eat 事件
      <button @click="$dispatch('eat', 'PARENT')">999</button> 
      ```

   4. $broadcast 向下找到对应子组件的方法；

      ```javascript
      Vue.prototype.$broadcast = function (eventName, componentName, value) {
          let children = this.$children;
          function broadcast(children) {
              for (let i = 0; i < children.length; i++) {
                  let child = children[i];
                  if (componentName === child.$options.name) {
                      child.$emit(eventName, value);
                      return;
                  } else {
                      if(child.$children){
                          broadcast(child.$children)
                      }
                  }
              }
          }
          broadcast(children)
      }
      ```

   5. $listeners, $attrs 传递所有事件和属性；

      ```javascript
      // Parent --> Son --> Gradson 
      // Parent
      <Parent a="1" b="2" c="3" d="4"/>
        
      // Son $attrs 全部传递下去
      <T v-bind="$attrs" @t1="t1" @t2="t2" @t3="t3" v-on="$listeners"/>
        
      // Gradson
      <div>
        	<p>{{$attrs.b}}{{$attrs.c}}{{$attrs.d}}</p>
      		<button @click="$listeners.t1"> t1</button>
      		<button @click="$listeners.t2"> t2</button>
      </div>
      ```

      

   6. provide, inject 会造成单向数据流混乱，实现工具库会采用这种方式；

      ```javascript
      // Parent --> Son --> Gradson 不经过 Son 直接把 Parent 值传递给 Gradson
      // Parent 
      export default {
      		provide(){
              return {
                parent: this
              }
      		}
      }
      
      // Gradson
      export default {
        	inject: ["parent"]
      }
      ```

4. 