self["webpackHotUpdatehmr"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let render = () => {
  const title = __webpack_require__(/*! ./title.js */ "./src/title.js")

  const root = document.getElementById('root')

  root.innerHTML = `
    <input type="text" id="text" />
    <h1>${title} 1</h1>
  `
}

render()

if (true) {
  module.hot.accept([/*! ./title.js */ "./src/title.js"], render)
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("59de08526227d94c687d")
/******/ })();
/******/ 
/******/ }
);