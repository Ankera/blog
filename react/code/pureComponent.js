/**
 * 比较是否相等
 * @param {*} obj1 
 * @param {*} obj2 
 * 
 * 同等效果
 * PureComponent 组件
 * memo 函数
 */
function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 === "object" || obj2 === null) {
        return false;
    }

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}




/**
 * React.memo 实现原理
 * @param {*} FuncComponent 
 */
function memo(FuncComponent) {
    class Proxy extends React.PureComponent {
        render() {
            return <FuncComponent {...this.props} />
        }
    }

    return Proxy;
}

function memoOther(FuncComponent) {
    return class extends React.PureComponent {
        render() {
            return FuncComponent(this.props)
        }
    }
}