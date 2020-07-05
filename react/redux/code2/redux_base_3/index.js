import React from 'react';
import ReactDOM from 'react-dom';
import Page from "./page";
import store from "./store/index"

ReactDOM.render(<Page store={store}/>, document.getElementById("root"));

 /**
 * 1. 提供基础版的 createStore,
 * 2. 统一处理 action， 
 *      创建 actionCreators ，由 bindActionCreators 统一处理
 * 3. 封装多个 reducer
 */