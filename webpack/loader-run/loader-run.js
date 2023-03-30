const fs = require('fs')

function runLoaders(options, finalCallback) {
  const {
    resource,
    loaders = [],
    context = {},
    readResource = fs.readFile,
  } = options

  const loaderObject = loaders.map(createLoaderObject)

  const loaderContext = context
  loaderContext.resource = resource
  loaderContext.readResource = readResource
  loaderContext.loaders = loaderObject
  // 当前正在执行loader的索引
  loaderContext.loaderIndex = 0

  // 加载的资源
  Object.defineProperty(loaderContext, 'request', {
    get() {
      return loaderContext.loaders
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    },
  })

  // 剩下未加载的资源
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get() {
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex + 1)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    },
  })

  // 加载的资源包括当前和剩下的
  Object.defineProperty(loaderContext, 'currentRequest', {
    get() {
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    },
  })

  // 已经加载过的资源
  Object.defineProperty(loaderContext, 'prevRequest', {
    get() {
      return loaderContext.loaders
        .slice(0, loaderContext.loaderIndex)
        .map((loader) => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    },
  })

  Object.defineProperty(loaderContext, 'data', {
    get() {
      return loaderContext.loaders[loaderContext.loaderIndex].data
    },
  })

  const processOptions = {
    resourceBuffer: null,
    readResource,
  }

  iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
    finalCallback(err, {
      result,
      resourceBuffer: processOptions.resourceBuffer,
    })
  })

  function iteratePitchingLoaders(
    processOptions,
    loaderContext,
    pitchingCallback
  ) {
    if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
      return processResource(processOptions, loaderContext, pitchingCallback)
    }

    // 获取当前的loader， post1-loader
    const currentLoader = loaderContext.loaders[loaderContext.loaderIndex]

    if (currentLoader.pitchExecuted) {
      loaderContext.loaderIndex++
      return iteratePitchingLoaders(
        processOptions,
        loaderContext,
        pitchingCallback
      )
    }

    const pitchFn = currentLoader.pitch
    // 表示当前 loader 的 pitch 已经执行过
    currentLoader.pitchExecuted = true
    if (!pitchFn) {
      return iteratePitchingLoaders(
        processOptions,
        loaderContext,
        pitchingCallback
      )
    }

    runSyncOrAsync(
      pitchFn,
      loaderContext,
      [
        loaderContext.remainingRequest,
        loaderContext.prevRequest,
        loaderContext.data,
      ],
      (err, ...returnArgs) => {
        if (returnArgs.some((arg) => arg !== undefined)) {
          loaderContext.loaderIndex--
          iterateNormalLoaders(
            processOptions,
            loaderContext,
            returnArgs,
            pitchingCallback
          )
        } else {
          return iteratePitchingLoaders(
            processOptions,
            loaderContext,
            pitchingCallback
          )
        }
      }
    )
  }

  /**
   * 读取源文件内容
   */
  function processResource(processOptions, loaderContext, pitchingCallback) {
    processOptions.readResource(
      loaderContext.resource,
      (err, resourceBuffer) => {
        processOptions.resourceBuffer = resourceBuffer
        loaderContext.loaderIndex--

        iterateNormalLoaders(
          processOptions,
          loaderContext,
          [resourceBuffer],
          pitchingCallback
        )
      }
    )
  }

  /**
   * 迭代执行 loader 的 normal 函数
   * @param {Object} processOptions 选项
   * @param {Object} loaderContext 上下文
   * @param {Object} args     参数
   * @param {Object} pitchingCallback  回调
   */
  function iterateNormalLoaders(
    processOptions,
    loaderContext,
    args,
    pitchingCallback
  ) {
    if (loaderContext.loaderIndex < 0) {
      return pitchingCallback(null, args)
    }
    // 获取当前的loader， post1-loader
    const currentLoader = loaderContext.loaders[loaderContext.loaderIndex]

    if (currentLoader.normalExecuted) {
      loaderContext.loaderIndex--
      return iterateNormalLoaders(
        processOptions,
        loaderContext,
        args,
        pitchingCallback
      )
    }

    const normalFn = currentLoader.normal
    // 表示当前 loader 的 pitch 已经执行过
    currentLoader.normalExecuted = true

    converArgs(args, loaderContext.raw)

    runSyncOrAsync(normalFn, loaderContext, args, (err, ...returnArgs) => {
      if (err) {
        return pitchingCallback(err)
      }
      return iterateNormalLoaders(
        processOptions,
        loaderContext,
        returnArgs,
        pitchingCallback
      )
    })
  }

  /**
   * 以同步或者异步的方式调用fn
   */
  function runSyncOrAsync(fn, loaderContext, args, runCallback) {
    // 默认以同步的方式执行
    let isSync = true

    const callback = (...args) => {
      runCallback(...args)
    }

    loaderContext.callback = callback

    loaderContext.async = () => {
      isSync = false
      return callback
    }

    const result = fn.apply(loaderContext, args)

    if (isSync) {
      callback(null, result)
    }
  }

  /**
   * @param {string} args
   * @param {Object} raw 想要字符串还是buffer
   */
  function converArgs(args, raw) {
    if (raw && !Buffer.isBuffer(args[0])) {
      // 把 字符串 转 buffer
      args[0] = Buffer.from(args[0])
    } else if (!raw && Buffer.isBuffer(args[0])) {
      // 把 buffer 转字符串
      args[0] = args[0].toString('utf8')
    }
  }
}

function createLoaderObject(loader) {
  const normal = require(loader)
  const pitch = normal.pitch
  const raw = normal.raw || false

  return {
    path: loader,
    normal,
    pitch,
    raw,
    data: {},
    // 表示当前 pitch 函数已经执行过
    pitchExecuted: false,
    // 表示当前 normal 函数已经执行过
    normalExecuted: false,
  }
}

module.exports = runLoaders
