/**
 * 设计哈希函数
 * 将字符串转换成比较大的数字: hashCode
 * 将大数字 hashCode 压缩到数组范围之内
 * @param {*} str 
 * @param {*} size 
 */
function hashFunc(str, size) {
    var hashCode = 0;
    for (var i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i);
    }

    return hashCode % size;
}

console.log(hashFunc("abc", 7));