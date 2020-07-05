/**
 * 实现原理
 * https://juejin.im/post/5d4c20a451882549594e7159#heading-16
 * 
 * 封装基本函数
 * https://blog.csdn.net/Winne_Shen/article/details/102609793?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
 */

function myTraverseAllChildren(children, func, result) {
    if (children === null) return children;
    if (!Array.isArray(children)) {
        myMapSingleEle(children, func, result);
        return;
    }

    for (let iterator of children) {
        myTraverseAllChildren(iterator, func, result);
    }
}

/**
 * 如果 ele 是有效元素，则直接平推到 result 数组里面
 * 如果 ele 是数组，数组里面的每一个元素经过 func 处理之后再平推 result 数组里面
 * @param {*} ele 
 * @param {*} func 
 * @param {*} result 
 */
function myMapSingleEle(ele, func, result) {
    let mappedEle = func(ele);
    if (Array.isArray(mappedEle)) {
        myTraverseAllChildren(mappedEle, c => c, result);
    } else if (mappedEle !== null) {
        result.push(mappedEle);
    }
}

let myChildren = ['a', 'b', ['c', 'd']], result = [];

myTraverseAllChildren(myChildren, ele => [ele, [ele]], result);

console.log(result)