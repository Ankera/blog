// instanceOf 实现原理
function instanceOf(A, B) {
    B = B.prototype;
    A = A.__proto__;
    while (true) {
        if (A === null) {
            return false;
        }
        if (A === B) {
            return true;
        }
        A = A.__proto__;
    }
}

/**
 * 原型 prototype
 * 原型链 __proto__
 */

