/**
 * https://zhuanlan.zhihu.com/p/50247513
 * 
 * 模拟最原始的redux，脱离react思想，用redux思想来模拟
 */

 /**
  * 根容器
  * index.html
    <div id="app"></div>
    <div id="content"></div>
  */

const initState = {
    title: {
        text: "标题",
        color: "red"
    },
    content: {
        text: "内容为王",
        color: "blue",
    }
}
const UPDATE_TITLE_COLOR = "UPDATE_TITLE_COLOR";
const UPDATE_TITLE_TEXT = "UPDATE_TITLE_TEXT";
const UPDATE_CONTENT_COLOR = "UPDATE_CONTENT_COLOR";
const UPDATE_CONTENT_TEXT = "UPDATE_CONTENT_TEXT";

function renderTitle(title) {
    let titleEle = document.getElementById("app");
    titleEle.innerHTML = title.text;
    titleEle.style.color = title.color;
}

function renderContent(content) {
    let contentEle = document.getElementById('content');
    contentEle.innerHTML = content.text;
    contentEle.style.color = content.color;
}

function renderApp(state) {
    renderTitle(state.title);
    renderContent(state.content)
}

function reducer(state, action) {
    if (!state) {
        state = initState;
    }
    switch (action.type) {
        case UPDATE_TITLE_COLOR:
            return { ...state, title: { ...state.title, color: action.color } };
        case UPDATE_TITLE_TEXT:
            return { ...state, title: { ...state.title, text: action.text } }
        case UPDATE_CONTENT_COLOR:
            return { ...state, content: { ...state.content, color: action.color } }
        case UPDATE_CONTENT_TEXT:
            return { ...state, content: { ...state.content, text: action.text } }
        default:
            return state;
    }
}

function createStore(reducer) {
    let state;
    let listeners = [];

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

    dispatch({
        type: "@@TYPE/REDUX_INIT"
    });

    return {
        getState,
        dispatch,
        subscribe
    }
}

let store = createStore(reducer);

renderApp(store.getState())

let unsubscribe = store.subscribe(() => { renderApp(store.getState()) });

setTimeout(() => {
    store.dispatch({
        type: UPDATE_TITLE_COLOR,
        color: "aqua"
    });

    store.dispatch({
        type: UPDATE_CONTENT_TEXT,
        text: "这是init初始化数据redux"
    });
}, 3000);