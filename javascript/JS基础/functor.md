## 函子

1. ##### 什么是 `Functor` 

   容器： 包含值和值的变形关系(这个变形关系就是函数)；

   函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）。

   基础函子构造函数

   ```javascript
   class Container {
       static of(value){
           return new Container(value)
       }
   
       constructor(value){
           this._value = value;
       }
   
       map(fn) {
           return Container.of(fn(this._value))
       }
   }
   
   let r = Container.of(5).map(x => x + 1)
       .map(x => x * x);
   console.log(r.value());
   ```

2. ##### MayBe 函子

   对外部的 <u>空值</u> 进行处理，处理null，undefined。

   ```javascript
   class MayBe {
   
       static of(value) {
           return new MayBe(value)
       }
   
       constructor(value) {
           this._value = value;
       }
   
       map(fn) {
           return this.isNoThing() ? MayBe.of(null) : MayBe.of(fn(this._value));
       }
   
       isNoThing() {
           return this._value === null || this._value === undefined;
       }
   }
   
   let r = new MayBe(null).map(x => x.toUpperCase());
   console.log(r);	// MayBe {_value: null}
   let r1 = new MayBe("hello world").map(x => x.toUpperCase());
   console.log(r1);	// MayBe {_value: "HELLO WORLD"}
   ```

3. ##### Either 函子

   Either 两者中的任何一个，类似于 if ... else ... 的处理；

   异常会让函数不纯，Either 函子可以用来做异常处理。

   ```javascript
   class Left {
       static of(value) {
           return new Left(value);
       }
       constructor(value) {
           this._value = value;
       }
       map(fn) {
           return this;
       }
   }
   class Right {
       static of(value) {
           return new Right(value)
       }
       constructor(value) {
           this._value = value;
       }
       map(fn) {
           return Right.of(fn(this._value));
       }
   }
   
   function parseJSON(str) {
       try {
           return Right.of(JSON.parse(str));
       } catch (e) {
           return Left.of({ error: e.message });
       }
   }
   
   let str = parseJSON("{\"name\": \"Tom\"}").map(x => String(x.name).toUpperCase());
   console.log(str)
   ```

4. #### IO 函子

   IO函子中的 _value 是一个函数，这里是把函数作为值来处理；

   IO函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作（惰性执行），包装当前纯操作；

   把不纯的操作交给调用者来处理。

   ```javascript
   const fp = require("lodash/fp");
   class IO {
       static of(value) {
           return new IO(function () {
               return value;
           })
       }
   
       constructor(fn) {
           this._value = fn;
       }
   
       map(fn) {
           return new IO(fp.flowRight(fn, this._value));
       }
   }
   
   let process = {
       exec: () => {
           console.log("hello world");
       }
   }
   let io = IO.of(process).map(p => p.exec())
   console.log(io)
   ```

   