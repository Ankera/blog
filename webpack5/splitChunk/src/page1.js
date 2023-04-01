const module1 = require('./module1')
const module2 = require('./module2')
const $ = require('jquery')

console.log('======== page1  ========')

console.log(module1, module2, $)

import(/* webpackChunkName: "asyncModule" */ './asyncModule')

const root = document.getElementById('root')
const button = document.createElement('button')
button.innerHTML = '按钮'

button.onclick = () => {
  import('./test01.js')
}

root.appendChild(button)
