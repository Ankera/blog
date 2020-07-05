
/**
 * 深拷贝
 *      拷贝后的结果更改是不会影响拷贝前的内容，拷贝前后是没有关系的
 *  
 * 浅拷贝
 *      改变拷贝前的内容
 */

// ... 扩展符号，只能深拷贝一层，第二层就是前拷贝
let obj1 = {
    name: "tom",
    address: {
        type: 11
    }
}

let objCopy1 = { ...obj1 };
objCopy1.name = "Anker";

/**
 * JSON.stringify(obj)
 * 缺陷
 * 不能拷贝 undefined
 */
let obj = {
    name: "Tom",
    address: {
        city: "wuhan"
    },
    type: undefined,
    type2: "",
    type3: null,
    foo: function () {
        console.log('fn')
    }
}

let objCopy = JSON.parse(JSON.stringify(obj));


/**
 * 实现深拷贝，浅拷贝
 */
function deepClone(obj, hash = new WeakMap()) {
    if (obj == null) {
        return obj;    // 如果是 null undefined 不进行深拷贝
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (typeof obj !== 'object') {
        return obj;
    }

    if (hash.get(obj)) {
        return hash.get(obj);
    }

    let cloneObj = new obj.constructor; // 通过构造函数创建实例
    hash.set(obj, cloneObj);
    for (const key in obj) {
        // 是否在当前原型上
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }

    return cloneObj;
}


obj.o = obj;
let objCopy2 = deepClone(obj);
console.log(objCopy2);