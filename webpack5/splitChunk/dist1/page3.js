(self["webpackChunksplitchunk"] = self["webpackChunksplitchunk"] || []).push([["page3"],{

/***/ "./src/page3.js":
/*!**********************!*\
  !*** ./src/page3.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const module1 = __webpack_require__(/*! ./module1 */ "./src/module1.js")
const module2 = __webpack_require__(/*! ./module3 */ "./src/module3.js")
const $ = __webpack_require__(/*! jquery */ "./node_modules/_jquery@3.6.4@jquery/dist/jquery.js")

console.log('======== page3  ========')

console.log(module1, module3, $)


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [true,"default-node_modules__jquery_3_6_4_jquery_dist_jquery_js-src_module1_js"], () => (__webpack_exec__("./src/page3.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);