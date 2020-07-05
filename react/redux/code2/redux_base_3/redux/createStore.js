export default function createStore(reducer) {
    let state;
    let listeners = []; // 存储订阅的函数

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(fn => fn());
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function () {
            listeners = listeners.filter(fn => fn !== listener);
        }
    }

    // 初始化调用
    dispatch({
        type: "@@TYPE/INIT_REUDX"
    })

    return {
        getState,
        dispatch,
        subscribe
    }
}