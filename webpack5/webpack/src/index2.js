// import '@babel/polyfill'
// import 'bootstrap'
// import moment from 'moment'
import _ from 'lodash'
import './index.css'

console.log(_.add(1))

// console.log('moment', moment(new Date()).format('YYYY/MM/DD'))

const sum = (a, b) => a + b

console.log(sum(2, 3))

const arr = [(1, 2, 3, 4, 5, 6, 7, 8, 9)]
arr.find((item) => item === 2)

const div = document.createElement('div')
div.setAttribute('class', 'active')
div.innerHTML = `hello world 11`
document.body.appendChild(div)
