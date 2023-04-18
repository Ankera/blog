;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory(require('react'))
  else if (typeof define === 'function' && define.amd)
    define(['react'], factory)
  else if (typeof exports === 'object')
    exports['any'] = factory(require('react'))
  else root['any'] = factory(root['React'])
})(self, (webpackExternalModuleReact) => {
  return (() => {
    var webpackModules = {
      './components/button/button.tsx': (
        unusedWebpackModule,
        webpackExports,
        webpackRequire
      ) => {
        'use strict'
        eval(
          'webpackRequire.r(webpackExports);\n/* harmony export */ webpackRequire.d(webpackExports, {\n/* harmony export */   "default": () => (webpackDefaultExport)\n/* harmony export */ });\n/* harmony import */ var reactwebpackImportedModule0 = webpackRequire(/*! react */ "react");\n/* harmony import */ var reactwebpackImportedModule0_Default = /*#pure*/webpackRequire.n(reactwebpackImportedModule0);\n\nvar Button = function Button(props) {\n  var children = props.children;\n  return /*#pure*/reactwebpackImportedModule0_Default().createElement("button", {\n    type: "button"\n  }, children);\n};\n/* harmony default export */ const webpackDefaultExport = (Button);\n\n// 如果你导出的是type，会保证编译去掉，可以进行更好的优化\n\n//# sourceURL=webpack://any/./components/button/button.tsx?'
        )
      },
      './components/button/index.tsx': (
        unusedWebpackModule,
        webpackExports,
        webpackRequire
      ) => {
        'use strict'
        eval(
          'webpackRequire.r(webpackExports);\n/* harmony export */ webpackRequire.d(webpackExports, {\n/* harmony export */   "default": () => (webpackDefaultExport)\n/* harmony export */ });\n/* harmony import */ var _buttonwebpackImportedModule0 = webpackRequire(/*! ./button */ "./components/button/button.tsx");\n\n/* harmony default export */ const webpackDefaultExport = (_buttonwebpackImportedModule0["default"]);\n\n//# sourceURL=webpack://any/./components/button/index.tsx?'
        )
      },
      './components/index.tsx': (
        unusedWebpackModule,
        webpackExports,
        webpackRequire
      ) => {
        'use strict'
        eval(
          'webpackRequire.r(webpackExports);\n/* harmony export */ webpackRequire.d(webpackExports, {\n/* harmony export */   "Button": () => (/* reexport safe */ _buttonwebpackImportedModule0["default"])\n/* harmony export */ });\n/* harmony import */ var _buttonwebpackImportedModule0 = webpackRequire(/*! ./button */ "./components/button/index.tsx");\n\n\n\n//# sourceURL=webpack://any/./components/index.tsx?'
        )
      },
      './index.js': (module, unusedWebpackExports, webpackRequire) => {
        eval(
          'module.exports = webpackRequire(/*! ./components */ "./components/index.tsx");\n\n//# sourceURL=webpack://any/./index.js?'
        )
      },
      react: (module) => {
        'use strict'
        module.exports = webpackExternalModuleReact
      },
    }
    var webpackModuleCache = {}
    function webpackRequire(moduleId) {
      var cachedModule = webpackModuleCache[moduleId]
      if (cachedModule !== undefined) {
        return cachedModule.exports
      }
      var module = (webpackModuleCache[moduleId] = {
        exports: {},
      })
      webpackModules[moduleId](module, module.exports, webpackRequire)
      return module.exports
    }
    ;(() => {
      webpackRequire.n = (module) => {
        var getter =
          module && module.esmodule ? () => module['default'] : () => module
        webpackRequire.d(getter, {
          a: getter,
        })
        return getter
      }
    })()
    ;(() => {
      webpackRequire.d = (exports, definition) => {
        for (var key in definition) {
          if (
            webpackRequire.o(definition, key) &&
            !webpackRequire.o(exports, key)
          ) {
            Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            })
          }
        }
      }
    })()
    ;(() => {
      webpackRequire.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop)
    })()
    ;(() => {
      webpackRequire.r = (exports) => {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          })
        }
        Object.defineProperty(exports, 'esmodule', {
          value: true,
        })
      }
    })()
    var webpackExports = webpackRequire('./index.js')
    return webpackExports
  })()
})
