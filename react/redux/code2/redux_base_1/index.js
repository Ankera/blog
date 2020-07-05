// https://zhuanlan.zhihu.com/p/50247513

/**
 * 基础版，只提供 createStore
 * 手动触发所有事件
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from './react-dom/index'
import App from './app';

import { createStore, reducer } from './redux/index';

let store = createStore(reducer);

ReactDOM.render(<App store={store}/>, document.getElementById("root"));