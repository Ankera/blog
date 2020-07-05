/**
 * 1. 提供基础版的 createStore,
 * 2. 统一处理 action， 
 *      创建 actionCreators ，由 bindActionCreators 统一处理
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TodosTest from './Todos';

import { createStore } from './redux/redux.js';
import { reducer } from './redux/index.js';

let store = createStore(reducer);

ReactDOM.render(<TodosTest store={store} />, document.getElementById("root"));