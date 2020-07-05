## 概念

1. ##### never 和 void 的区别

   void 的可以被赋值为 null 或 undefined 类型，never是一个不包含值的类型；

   拥有 void 返回值类型的函数能正常运行，拥有 never 返回值类型的函数无法正常返回，无法终止，或异常。

2. ##### 重写与重载

   重写子类重写父类中的方法；

   重载为一个函数提供多种定义，参数不同

3. ##### 函数内部自定义接口

   ```typescript
   function sum(): number {
       let args: IArguments = arguments;
       return Array.prototype.slice.call(args).reduce((a, b) => a + b, 0);
   }
   ```

4. ##### 泛型，即宽泛的类型

5. ##### 忽略类型检查

   ```typescript
   //@ts-ignore
   ```

6. ##### 泛型

   1. ###### 多个泛型变量

      ```typescript
      function swap<A, B>(tuple:[A,B]):[B,A]{
          return [tuple[1], tuple[0]];
      }
      ```

   2. ###### 默认泛型

      ```typescript
      // 泛型接口，用来约束函数, 默认泛型
      interface Calculate {
          <T = number>(a: T, b: T): T
      }
      ```

   3. ###### 泛型参数继承，约束

      ```typescript
      // 泛型继承
      interface LengthWise {
          length: number
      }
      
      function logger<T extends LengthWise>(val: T): void {
          // 参数必须具有 length 属性
      }
      ```

   4. ######  泛型的别名，type可以定义别名

      ```typescript
      type Car<T> = { list: T[] } | T[];
      let c1: Car<number> = { list: [1, 2, 3] };
      let c2: Car<number> = [2, 3, 5, 6]
      ```

   5. ###### 自定义类型的保护

      ```typescript
      interface Bird {
          swing: number
      }
      interface Dog {
          leg: number
      }
      
      function isBird(x: Bird | Dog): x is Bird {
          return (x as Bird).swing === 2
      }
      
      // 类型保护是为了更具体调用参数上的属性和方法
      function getAnimal(x: Bird | Dog): string {
          if (isBird(x)) {
              return "我是一只鸟";
          } else {
              return "我是一只狗";
          }
      }
      ```

   6. ###### 交叉类型

      ```typescript
      interface Bird {
          name: string;
          fly(): void
      }
      
      interface Person {
          age: number;
          talk(): void
      }
      
      // 把多个类型合并成一个大的总类型
      // type 是定义类型
      type BirdMan = Bird & Person;
      let bm: BirdMan = {
          name: "Tom",
          age: 10086,
          fly() {
              console.log("飞")
          },
          talk() {
              console.log("talk");
          }
      }
      ```

   7. ###### typeof 用来获取一个变量的类型

      ```typescript
      // 先拿到一个对象，然后通过对象获取反推这个对象的类型
      let p1 = {
          name: "Anker",
          age: 10010,
          gender(){
              return 1
          }
      }
      
      type Person = typeof p1;
      let p2: Person = {
          name: "Tom",
          age: 10086,
          gender(){
              return 0
          }
      }
      ```

   8. ###### 索引访问操作符

      ```typescript
      interface Person {
          name:string;
          age: number;
          job: {
              name: string,
          },
          interests: {name: string, level: number}[]
      }
      
      let FrontEndJob: Person["job"] = {name: "frontEnd"};
      let interests: Person["interests"] = [
          {
              name: "唱歌",
              level: 1
          }
      ]
      ```

   9. ###### 索引类型查询操作符号 keyof

      ```typescript
      interface Person {
          name: string;
          age: number;
      }
      
      type PersonKey = keyof Person;
      
      function getValueByKey(p: Person, key: PersonKey): any {
          return p[key];
      }
      
      let p = { name: "Tom", age: 12 };
      let val1 = getValueByKey(p, "name");
      let val2 = getValueByKey(p, "xxx"); // 取 xxx 时报错，因为被约束了，只能取有的属性名
      ```

   10. ###### 映射类型

       ```typescript
       interface Person {
           name: string;
           age: number;
           gender: "male" | "female";
       }
       
       // 映射所有 Person 的 key 值，且是可选的
       // 批量定义 in
       type PersonSearch = {
           [key in keyof Person]?: Person[key]
       }
       ```

   11. ###### 内置的工具类型，和10一样功能，必选变成可选的

       ```typescript
       interface Person {
           name: string;
           age: number;
           gender: "male" | "female";
       }
       
       type Partial<T> = {
           [P in keyof T]?: T[P]
       }
       
       type PersonSearch = Partial<Person>;
       ```

   12. ###### 把可选的变成必填的

       ```typescript
       interface Person {
           name?: string;
           age?: number;
           gender?: "male" | "female";
       }
       
       type required<T> = {
           [P in keyof T]-?: T[P]
       }
       
       type PersonRequired = required<Person>;
       
       let PersonSearch: PersonRequired = {
           name: "Tom",
           age: 10010,
           gender: "male"
       }
       ```

   13. ###### `readonly` 所有接口的属性修改成只读的 

       ```typescript
       enum GENDER {
           OTHER,
           BOY,
           GIRL
       }
       
       interface Person {
           name: string;
           age: number;
           gender: GENDER.OTHER | GENDER.BOY | GENDER.GIRL
       }
       
       type ReadOnly<T> = {
           readonly [P in keyof T]: T[P]
       }
       
       type PersonReadOnly = ReadOnly<Person>;
       ```

   14. ###### `pick` 从一个类型中捡出若干个小类型

       ```typescript
       // Pick 是内置类型
       enum GENDER {
           OTHER,
           BOY,
           GIRL
       }
       
       interface Person {
           name: string;
           age: number;
           gender: GENDER.OTHER | GENDER.BOY | GENDER.GIRL
       }
       
       type Pick<T, K extends keyof T> = {
           [P in K]?: T[P]
       }
       
       // 从 Person 中只取出 name age 属性, 且可选
       type PersonSub = Pick<Person, "name" | "age">; 
       let ps: PersonSub = {name: "Tom"};
       ```

7. ##### `Exclude` & `Extract`

   ```typescript
   // 排除 string 类型
   type E = Exclude<string | number | boolean, string>;
   let e1: E = 100;
   let e2: E = true;
   // let e3: E = "Hello"; // 不允许
   
   // 提取 string 类型
   type E2 = Extract<string | number | boolean, string>;
   let e21: E2 = "Hello";
   // let e22: E2 = 100; 
   ```

8. ##### `NonNullable`

   ```typescript
   // 排除 null 和 undefined
   type E3 = NonNullable<null | undefined | string | number>;
   
   let e31: E3 = 12;
   let e32: E3 = undefined; // 不允许
   ```

9. ##### `ReturnType` 获取返回类型

   ```typescript
   function getUserInfo(){
       return {
           name: "Tom",
           age: 10
       }
   }
   
   type UserInfo = ReturnType<typeof getUserInfo>;
   ```

10. ##### Class 类推导对象类型

    ```typescript
    class Person {
        name: string;
        age?: number
        constructor(name:string, age: number) {
            this.name = name;
            this.age =age;
        }
    }
    
    type PersonIns = InstanceType<typeof Person>;
    
    let p91: PersonIns = {
        name: "Tom"
    }
    ```

11. ##### 扩展全局变量，属性

    ```typescript
    // 1. 非模块内部扩展全部变量
    interface Function {
        myCall(context: any): void
    }
    Function.prototype.myCall = function (context) {
    	// ...
    }
    
    interface String {
        double(): void;
    }
    String.prototype.double = function () {
        return `${this}${this}`;
    }
    
    
    // 2. 模块内部扩展全部变量, 有 export {} 标识
    export { }
    declare global {
        interface String {
            double(): string
        }
    
        interface Window {
            myname: string
        }
    }
    ```

12. ##### 合并声明，同一个名称的两个独立声明会合并成一个单一声明

    ```typescript
    // 假设两个文件 a.ts  b.ts 都没有 export { }
    // a.ts 文件
    interface Person {
        name: string
    }
    
    // b.ts 文件
    interface Person {
        age: number
    }
    
    使用时
    let p1:Person = {name: "Tom", age: 12}
    ```

    

13. ##### `declare`  [查看链接](https://juejin.im/post/5d2715d851882579cc3cca58)

    ```typescript
    declare namespace $ {
        function ajax(url: string, setting: any):void;
        let name: string;
        let a: string;
        namespace fn {
            function extend(object: any): void;
        }
    }
    
    $.ajax("/user/list", {});
    console.log($.name);
    $.fn.extend({});
    ```

14. ##### `Namespace`

    1. ###### 使用命名空间扩展类

    ```typescript
    class Form {
        username: Form.Item = "";
        password: Form.Item = "";
    }
    
    namespace Form {
        export class Item {}
    }
    ```

    2. ###### 使用命名空间扩展枚举

    ```typescript
    enum COLOR  {
        RED = 1,
        BLUE = 2
    }
    
    // 扩展两个属性
    namespace COLOR {
        export const YELLOW = 3;
        export const PINK = 4;
    }
    ```

       

15. ##### 安装声明文件

    ```
    cnpm i @types/jquery --save
    ```

    

