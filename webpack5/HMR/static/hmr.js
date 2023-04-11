;(() => {
  // 当前最新的 hash
  let currentHash

  // 上一次的hash
  let lastHash

  function hotCheck() {
    console.log('开始进行热更新检查')

    hotDownloadMainifest()
      .then((update) => {
        update.c.forEach((chunkId) => {
          hotDownloadUpdateChunk(chunkId)
        })
      })
      .catch((error) => {
        window.location.reload()
      })
  }

  function hotDownloadMainifest() {
    const url = `main.${lastHash}.hot-update.json`
    return fetch(url).then((res) => res.json())
  }

  function hotDownloadUpdateChunk(chunkId) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `${chunkId}.${lastHash}.hot-update.js`
    document.head.appendChild(script)
  }

  self['webpackHotUpdate'] = function (chunkId, moreModules) {
    hotAddUpdateChunk(chunkId, moreModules)
  }

  let hotUpdate = {}
  function hotAddUpdateChunk(chunkId, moreModules) {
    for (var moduleId in moreModules) {
      hotUpdate[moduleId] = modules[moduleId] = moreModules[moduleId]
    }

    hotApply()
  }

  function hotApply(chunkId) {
    for (var moduleId in hotUpdate) {
      let oldModule = cache[moduleId]
      delete cache[moduleId]
      if (oldModule.parents && oldModule.parents.size > 0) {
        let parents = oldModule.parents
        parents.forEach((father) => {
          father.hot.check(moduleId)
        })
      }
    }

    lastHash = currentHash
  }

  var modules = {
    './src/index.js': (module, exports, require) => {
      let render = () => {
        const title = require('./src/title.js')

        const root = document.getElementById('root')

        root.innerHTML = title
      }

      render()

      if (module.hot) {
        module.hot.accept(['./src/title.js'], render)
      }
    },
    './src/title.js': (module, exports, require) => {
      module.exports = 'hello Title Tom 12'
    },
    './webpack/hot/emitter.js': (module, exports, require) => {
      class EventEmitter {
        constructor() {
          this.events = {}
        }
        on(eventName, fn) {
          this.events[eventName] = fn
        }
        emit(eventName, ...args) {
          this.events[eventName](...args)
        }
      }
      module.exports = new EventEmitter()
    },
  }

  var cache = {}

  function hotCreateModule() {
    let hot = {
      _acceptDependencies: {},
      accept(deps, callback) {
        for (let i = 0; i < deps.length; i++) {
          hot._acceptDependencies[deps[i]] = callback
        }
      },
      check(moduleId) {
        const callback = hot._acceptDependencies[moduleId]
        callback && callback()
      },
    }
    return hot
  }

  function hotCreateRequire(parentModuleId) {
    // debugger
    var parentModule = cache[parentModuleId]
    if (!parentModule) {
      return require
    }
    var hotRequire = function (childModuleId) {
      parentModule.children.add(childModuleId)
      // var childModule = require(childModuleId)
      // childModule.parents.push(childModule)
      // return childModule.exports

      let childExports = require(childModuleId)
      let childModule = cache[childModuleId]
      childModule.parents.add(parentModule)
      return childExports
    }
    return hotRequire
  }

  function require(moduleId) {
    var cachedModule = cache[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports
    }
    var module = (cache[moduleId] = {
      exports: {},
      hot: hotCreateModule(), // 每个模块都会多一个hot属性，用来注册热更新回调
      parents: new Set(), // 父模块
      children: new Set(), // 子模块
    })
    // debugger
    modules[moduleId](module, module.exports, hotCreateRequire(moduleId))
    return module.exports
  }

  var webpackExports = {}
  ;(() => {
    const hotEmitter = require('./webpack/hot/emitter.js')
    const socket = io()
    socket.on('hash', (hash) => {
      console.log('发送给客户端 === hash', hash)
      currentHash = hash
    })
    socket.on('ok', () => {
      console.log('发送给客户端 === ok')

      reloadApp()
    })
    function reloadApp() {
      hotEmitter.emit('webpackHotUpdate', currentHash)
    }
  })()
  ;(() => {
    const hotEmitter = require('./webpack/hot/emitter.js')
    hotEmitter.on('webpackHotUpdate', (currentHash) => {
      console.log('dev-server 收到了最新的hash值', currentHash)
      if (!lastHash) {
        lastHash = currentHash
        console.log('这是第一次hash，首次渲染 ==== ')
        return
      }
      console.log(
        'lastHash=',
        lastHash,
        'currentHash=',
        currentHash,
        '开始执行热更新'
      )
      hotCheck()
    })
  })()

  // require('./src/index.js')
  hotCreateRequire('./src/index.js')('./src/index.js')

  setTimeout(() => {
    console.log(cache)
  }, 1000)
})()
