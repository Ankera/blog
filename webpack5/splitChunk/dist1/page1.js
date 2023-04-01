(self["webpackChunksplitchunk"] = self["webpackChunksplitchunk"] || []).push([["page1"],{

/***/ "./src/page1.js":
/*!**********************!*\
  !*** ./src/page1.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const module1 = __webpack_require__(/*! ./module1 */ "./src/module1.js")
const module2 = __webpack_require__(/*! ./module2 */ "./src/module2.js")
const $ = __webpack_require__(/*! jquery */ "./node_modules/_jquery@3.6.4@jquery/dist/jquery.js")

console.log('======== page1  ========')

console.log(module1, module2, $)

__webpack_require__.e(/*! import() | asyncModule */ "asyncModule").then(__webpack_require__.bind(__webpack_require__, /*! ./asyncModule */ "./src/asyncModule.js"))

const root = document.getElementById('root')
const button = document.createElement('button')
button.innerHTML = '按钮'

button.onclick = () => {
  __webpack_require__.e(/*! import() */ "src_test01_js").then(__webpack_require__.t.bind(__webpack_require__, /*! ./test01.js */ "./src/test01.js", 23))
}

root.appendChild(button)


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["default-node_modules__jquery_3_6_4_jquery_dist_jquery_js-src_module1_js","default-src_module2_js"], () => (__webpack_exec__("./src/page1.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);