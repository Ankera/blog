/**
* 返回false的值
* false    undefined   null    ''  0   NaN
*/


/**
* 运算，字符串拼接
*  如果有一方是字符串，就认为是字符串拼接
*  1 + {} // "1[object Object]"
*/


/**
 * +拼接任意对象结果
 */
+'123'; // 123
1 + +'123'; // 124
+true; // 1
+false; // 0
+{}; // NaN
+[]; // 0
+[12]; // 12
+[12, 1, 2]; // NaN
+"12,2"; // NaN
+Symbol; // NaN
+null // 0 
    + undefined // NaN
Number(null) // 0

/**
 * https://juejin.im/post/5ca8074951882543be3ed16b
 * 
 * 运算，字符串拼接
 *  如果有一方是字符串，就认为是字符串拼接
 *  1 + {} // "1[object Object]"
 * 
 * 
 * 每个对象都有一个toString()方法和valueOf方法，
 * 其中toString()方法返回一个表示该对象的字符串，
 * valueOf 方法返回该对象的原始值。
 */

/**
 * 总结一
 * toString 方法对于值类型数据使用而言，其效果相当于类型转换，将原类型转为字符串
 * valueOf 方法对于值类型数据使用而言，其效果将相当于返回原数据。
 */
let str = "hello";
let num = 123;
let bool = true;
console.log(typeof (str.toString()) + "_" + str.toString());    // string_hello
console.log(typeof (num.toString()) + "_" + num.toString());    // string_123
console.log(typeof (bool.toString()) + "_" + bool.toString());  // string_true

console.log(str.valueOf() === str);     // true
console.log(num.valueOf() === num);     // true
console.log(bool.valueOf() === bool);   // true

console.log(typeof (str.valueOf()) + "_" + str.valueOf());      // string_hello
console.log(typeof (num.valueOf()) + "_" + num.valueOf());      // number_123
console.log(typeof (bool.valueOf()) + "_" + bool.valueOf());    // boolean_true


console.log('*************************************************');

/**
 * 总结二
 * 复合对象类型数据使用toString及valueOf方法
 * 1、 在进行字符串强转时候，优先调用toString()方法。
 *     在进行数值运算的时候，优先调用valueOf方法。
 * 2、 再有运算符的情况下，valueOf的优先级要高于toString()方法。
 */
var obj = {
    name: "Tom"
}
console.log(obj.toString());    // [object Object]
console.log(obj.valueOf());     // 返回本身

// 案例
var testObj = {
    i: 10,
    toString: function () {
        console.log('toString');
        return this.i;
    },
    valueOf: function () {
        console.log('valueOf');
        return this.i;
    }
}
console.log(testObj);
console.log(+testObj);  // valueOf
console.log("1" + testObj); // valueOf
console.log(String(testObj));   // toString
console.log(Number(testObj));   // valueOf
console.log('bool', testObj == '10');     // valueOf
console.log('bool', testObj === '10');
console.log('bool', testObj == 10);     // valueOf
console.log('bool', testObj === 10);
console.log('*************************************************');


/**
 * 总结三
 * 1. toString()可以将所有的数据都转换为字符串，但是要排除null和undefined
 * 2. null和undefined不能转换为字符串,null和undefined调用toString()方法会报错
 * 3. 如果当前数据为数字类型，则toString()括号中的可以写一个数字，代表进制，可以将数字转化为对应进制字符串
 * 
 * Symbol.toPrimitive在类型转换方面，优先级是最高的
 */

let initObj = {
    [Symbol.toPrimitive](hint) {
        // hint 有三种类似 string number default
        if (hint === 'number') {
            console.log('Number 场景');
            return 123;
        }
        if (hint === 'string') {
            console.log('String 场景');
            return 'str';
        }
        if (hint === 'default') {
            console.log('Default 场景');
            return 'default';
        }
    },
}

console.log(2 * initObj);   // Number 场景
console.log(2 + initObj);   // Default 场景
console.log("" + initObj);  // Default 场景
console.log(String(initObj));   // String 场景

console.log('*************************************************');
/**
 * 比较运算符
 * > = <
 */

console.log('a' < 'bb'); // 转 ascii
console.log(1 < '123'); // 把字符串转数字
console.log(1 < 'aa'); // 'aa' 无法转数字
console.log(NaN === NaN); // 'aa' 无法转数字
console.log(1 == true); // true 转数字 1
console.log(1 == '1'); // 把字符串转数字
console.log([] == ![]) // 0 == 0
console.log([] == false) // 0 == 0
console.log('' == Number('')) // '' == 0