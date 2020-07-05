/**
 * 构造普通函数
 * 
 * 高阶函数，函数可以作为函数的参数或返回值
 * 
 * 构造时，从内往外，使用时从外往内，
 * 类似栈的结构，先入后出
 * 
 * 构造 render-props
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Page from "./page";

ReactDOM.render(<Page />, document.getElementById("root"));