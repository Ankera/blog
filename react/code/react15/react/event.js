import { updateQueue } from "./component";
// 事件缓存对象，JS单线程
let syntheticEvent = null;

/**
 * React 并不是把事件绑定到 DOM 节点上，而是绑定 document，通过事件委托来处理
 * 1. 合成事件可以屏蔽浏览器的差异，不同浏览器绑定事件和触发事件的方法不一样
 * 2. 合成事件可以事件对象复用，重用，减少垃圾回收，提高性能
 * 3. 实现批量更新，setState 两个合成一个，批量更新
 * @param {*} dom 
 * @param {*} key 
 * @param {*} value 
 */
export function addEvent(dom, eventType, listener) {
    eventType = eventType.toLowerCase();

    // 在绑定的DOM节点上挂载一个对象，准备存放监听函数
    let eventStore = dom.eventStore || (dom.eventStore = {});

    // eventStore.onclick = () => {}
    eventStore[eventType] = listener;

    // 绑定事件
    document.addEventListener(eventType.slice(2), dispatchEvent, false);
}

/**
 * 真正事件触发的统一回调函数
 * @param {*} event 原生DOM事件对象
 */

function dispatchEvent(event) {
    let { type, target } = event;
    let eventType = "on" + type;
    syntheticEvent = getSyntheticEvent(event);

    // 在事件监听函数执行前先进入批量更新模式
    updateQueue.isPending = true;

    while (target) {
        let { eventStore } = target;
        let listener = eventStore && eventStore[eventType];
        if (listener) {
            listener.call(target, syntheticEvent);
            // 持久化产生的空对象
        }

        target = target.parentNode;
    }

    // 销毁事件, 单线程，函数监听完，就取消所有属性，供下次复用
    // 持久化销毁的是新产生的空对象
    for (const key in syntheticEvent) {
        if (key !== "persist") {
            syntheticEvent[key] = null;
        }
    }

    // 当事件处理完成之后，把批量更新模式更改 false
    updateQueue.isPending = false;
    // 批量更新状态
    updateQueue.batchUpdate();
}

// 数据持久化
class SyntheticEvent {
    persist() {
        // 此地方可以优化 null
        syntheticEvent = Object.create(null);
    }
}

/**
 * 创建合成事件
 * @param {*} nativeEvent 
 */
function getSyntheticEvent(nativeEvent) {
    if (!syntheticEvent) {
        syntheticEvent = new SyntheticEvent();
    }

    syntheticEvent.nativeEvent = nativeEvent;
    syntheticEvent.currentTarget = nativeEvent.target;

    for (const key in nativeEvent) {
        if (typeof key === "function") {
            syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
        } else {
            syntheticEvent[key] = nativeEvent[key]
        }
    }

    return syntheticEvent;
}