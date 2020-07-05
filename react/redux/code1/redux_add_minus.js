/**
 * https://zhuanlan.zhihu.com/p/50247513
 * 
 * 模拟最原始的redux，脱离react思想，用redux思想来模拟
 * 
 */

 /**
  * 根容器
  * index.html
    <div id="counter"></div>
    <div id="add">+</div>
    <div id="minus">-</div>
  */

let ADD = 'ADD';
let MINUS = 'MINUS';

let counterEle = document.getElementById("counter");
let addEle = document.getElementById("add");
let minusEle = document.getElementById("minus");

function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 }
        case MINUS:
            return { number: state.number - 1 }
        default:
            return state
    }
}

function createStore(reducer) {
    let state;
    let listeners = []; // 订阅监听

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);

        // 派发完了主动触发订阅事件
        listeners.forEach(fn => fn());
    }

    function subscribe(listener) {
        listeners.push(listener);
        // 闭包
        return function () {
            listeners = listeners.filter(fn => fn !== listener);
        }
    }

    dispatch({
        type: "@@TYPE/REDUX_INIT"
    });

    return {
        getState,
        dispatch,
        subscribe
    }
}

const store = createStore(reducer);

function render() {
    counterEle.innerHTML = store.getState().number;
}

render();

let unsubscribe = store.subscribe(render);

addEle.addEventListener('click', () => {
    store.dispatch({
        type: ADD
    });

    // unsubscribe();
});

minusEle.addEventListener('click', () => {
    store.dispatch({
        type: MINUS
    })
});