### setState更新流程

1. setState可能是异步的

   ```
   			this.setState(newState)
   					 |
   					 V
   				newState存入到队列中
   					 |
   					 V
   			--------------------
   			|YES			   |NO
   			V				   V	
   	保存组件 dirtyComponent	    遍历所有的dirtyComponent，
   							   调用 updateComponent，更新props，state
   ```

2. 事件的 transaction

   ```
   1. 一个所谓的 Transaction 就是讲需要执行的 method 使用 wrapper 封装起来，再通过 Transaction 提供的 perform 方法执行。
   2. 而在 perform 执行之前，先执行所有 wrapper 中的 initlize 方法，perform 完成之后(即 method 方法执行完)， 再执行所有的 close 方法。
   3. 一组 initialine 及 close 方法称为一个 wrapper。
   ```

   