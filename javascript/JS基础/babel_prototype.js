/**
 * 模拟class类转换
 */

function define(target, protoProperties){
    for (let i = 0; i < protoProperties.length; i++) {
        const property = protoProperties[i];
        Object.defineProperty(target, property.key, {
            configurable: true,
            enumerable: false, // 不可枚举
            ...property
        })
    }
}

/**
 * 模拟构造器
 * @param {*} Constructor   构造器 
 * @param {*} protoProperties   prototype
 * @param {*} staticProperties  static
 */
function defineProperty(Constructor, protoProperties, staticProperties) {
    if (Array.isArray(protoProperties)) {
        define(Constructor.prototype, protoProperties);
    }

    if (Array.isArray(staticProperties)) {
        define(Constructor, staticProperties);
    }
}

var Animal = (function () {
    function Animal() {
        if (!(this instanceof Animal)) {
            throw new Error("not new")
        }
        this.name = "狗狗";
    }

    defineProperty(Animal, [
        {
            key: "say",
            value: function () {
                console.log("say")
            }
        },
        {
            key: "eat",
            value: function () {
                console.log("eat")
            }
        }
    ], [
        {
            key: "a",
            value: function () {
                return "aaaaa"
            }
        },
        {
            key: "b",
            value: function () {
                return "bbbbbb"
            }
        },
    ]);

    return Animal;
})();

var a1 = new Animal();
console.log(Animal.a());
console.log(a1);