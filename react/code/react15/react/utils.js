import { addEvent } from "./event";

export function onlyOne(obj) {
    return Array.isArray(obj) ? obj[0] : obj;
}

export function setProps(dom, props) {
    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            let value = props[key];
            setProp(dom, key, value);
        }
    }
}

function setProp(dom, key, value) {
    if (/^on/.test(key)) {
        // dom[key.toLowerCase()] = value;
        addEvent(dom, key, value);
    } else if (key === "style") {
        for (const attr in value) {
            if (value.hasOwnProperty(attr)) {
                dom.style[attr] = value[attr]
            }
        }
    } else if (key === "children") {

    } else {
        dom.setAttribute(key, value);
    }
}

// 数组平铺
export function flatten(array) {
    let flatternArray = [];
    (function flat(arr) {
        arr.forEach(item => {
            if (Array.isArray(item)) {
                flat(item)
            } else {
                flatternArray.push(item);
            }
        });
    })(array);
    return flatternArray;
}

export function isFunction(obj) {
    return typeof obj === "function";
}

/**
 * 1. 老有新没有 删除
 * 2. 老有新有 更新
 * 3. 老没有新有 添加
 * @param {*} dom 
 * @param {*} oldProps 
 * @param {*} newProps 
 */
export function patchProps(dom, oldProps, newProps) {
    // 老有新没有 删除
    for (const key in oldProps) {
        if (key !== "children" && !newProps.hasOwnProperty(key)) {
            dom.removeAttribute(key)
        }
    }

    for (const key in newProps) {
        if (key !== "children") {
            setProp(dom, key, newProps[key])
        }
    }
}