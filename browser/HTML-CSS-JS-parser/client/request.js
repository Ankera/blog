const http = require('http')
const css = require('css')
const { createCanvas } = require('canvas')
const fs = require('fs')
const htmlparser2 = require('htmlparser2')
const main = require('./main')
const network = require('./network')
const render = require('./render')
const gpu = require('./gpu')

const host = 'localhost'
const port = '7070'

const loadingLinks = {}
const loadingScript = {} //

// 1、模拟用户发送的请求，用户手动输入地址
// http://localhost:7070/index.html
main.on('request', (options) => {
  network.emit('request', options)
})

// 5、主进程，接收到信息后，通知渲染进程开始渲染
main.on('prepareRender', (response) => {
  // 6、主进程发送提交导航信息给渲染进程
  render.emit('commitNavigation', response)
})

// *********** 网络进程 ***********
// 3、主进程通知网络进程发起请求
network.on('request', (options) => {
  // 发送请求给服务器
  const request = http.request(options, (response) => {
    // 4、获取到服务器数据之后，网络进程通知主进程数据获取到了
    main.emit('prepareRender', response)
  })

  request.end()
})

// *********** 主进程 ***********
// 2、有主进程接收用户输入的地址
main.emit('request', {
  host,
  port,
  path: '/index.html',
})

// *********** 渲染进程 ***********
// 7、接收到主进程的提交导航
render.on('commitNavigation', (response) => {
  const header = response.headers
  const contentType = header['content-type']

  if (contentType.indexOf('text/html') !== -1) {
    let document = { type: 'documet', attributes: {}, children: [] }
    const tokenStack = [document]
    const cssRules = []
    const parser = new htmlparser2.Parser({
      onopentag(tagName, attributes) {
        const parent = tokenStack[tokenStack.length - 1]

        const child = {
          type: 'element',
          tagName,
          children: [],
          attributes,
        }

        parent.children.push(child)

        tokenStack.push(child)
      },
      ontext(text) {
        if (!/^[\r\n\s]*$/.test(text)) {
          const parent = tokenStack[tokenStack.length - 1]

          const child = {
            type: 'text',
            children: [],
            tagName: '',
            text,
            attributes: {},
          }

          parent.children.push(child)
        }
      },
      onclosetag(tagName) {
        switch (tagName) {
          case 'style':
            {
              const styleToken = tokenStack[tokenStack.length - 1]
              const cssAST = css.parse(styleToken.children[0].text)
              const rules = cssAST.stylesheet.rules
              cssRules.push(...rules)
            }
            break
          case 'link':
            {
              const linkToken = tokenStack[tokenStack.length - 1]
              const href = '/' + linkToken.attributes.href
              const options = { host, port, path: href }
              const promise = network
                .fetchResource(options)
                .then(({ body }) => {
                  delete loadingLinks[href]
                  const cssAst = css.parse(body)
                  cssRules.push(...cssAst.stylesheet.rules)
                })
              loadingLinks[href] = promise
            }
            break
          case 'script':
            {
              const scriptToken = tokenStack[tokenStack.length - 1]
              const src = scriptToken.attributes.src
              if (src) {
                const options = { host, port, path: src }
                const promises = [
                  ...Object.values(loadingLinks),
                  ...Object.values(loadingScript),
                ]
                const promise = network
                  .fetchResource(options)
                  .then(({ body }) => {
                    delete loadingScript[src]
                    return Promise.all(promises).then(() => {
                      eval(body)
                    })
                  })
                loadingScript[src] = promise
              } else {
                const script = scriptToken.children[0].text
                const ts = Date.now()
                const promises = [
                  ...Object.values(loadingLinks),
                  ...Object.values(loadingScript),
                ]
                const promise = Promise.all(promises).then(() => {
                  delete loadingScript[ts]
                  eval(script)
                })
                loadingScript[ts] = promise
              }
            }
            break
          default:
            break
        }
        tokenStack.pop()
      },
    })

    response.on('data', (buffer) => {
      parser.write(buffer.toString())
    })

    response.on('end', () => {
      Promise.all([
        ...Object.values(loadingLinks),
        ...Object.values(loadingScript),
      ]).then(() => {
        /**
         * 8、DOM解析完成，CSSOM 解析完成
         * 重新计算样式
         */
        recalculateStyle(cssRules, document)

        const html = document.children[0]
        const body = html.children[1]
        // 8、1创建一个只包含可见元素布局树
        const layoutTree = createLayoutTree(body)

        // 8、2 更新布局树，计算每个元素布局信息
        updateLayoutTree(layoutTree)
        // console.dir(document, { depth: null })

        // 8、3 根据布局树，生成分层树
        const layers = [layoutTree]
        createLayerTree(layoutTree, layers)
        // console.dir(layers, { depth: null })

        // 8、4 根据分层树，生成绘制步骤，并且复合图层
        const paintSteps = compositeLayers(layers)
        // console.log(paintSteps.flat().join('\r\n'))

        // 8、5 切成一个个小图块
        const tiles = splitTiles(paintSteps)

        // 8、5  把切好的图块给光栅去处理，变成位图 栅格化
        raster(tiles)

        main.emit('DOMContentLoaded')
        // 9、图片，CSS加载完成
        main.emit('load')
      })
    })
  }
})

gpu.on('raster', (tile) => {
  gpu.bitMaps.push(tile)
})

// 主进程接收到 draw quad， 开始显示图
main.on('drawQuad', () => {
  let drawSteps = gpu.bitMaps.flat()
  const canvas = createCanvas(200, 500)
  const ctx = canvas.getContext('2d')

  eval(drawSteps.join('\r\n'))

  fs.writeFileSync('chrome_canvas.png', canvas.toBuffer('image/png'))
})

main.on('DOMContentLoaded', () => {})

main.on('load', () => {})

/**
 *
 */
function recalculateStyle(cssRules, element, parentStyle = {}) {
  const attributes = element.attributes
  // 样式集成
  element.computedStyle = {}

  Object.entries(attributes).forEach(([key, value]) => {
    cssRules.forEach((rule) => {
      const selector = rule.selectors[0]
      if (
        (key === 'id' && selector === '#' + value) ||
        (key === 'class' && selector === '.' + value)
      ) {
        rule.declarations.forEach(({ property, value }) => {
          element.computedStyle[property] = value
        })
      }
    })

    if (key === 'style') {
      const styles = value.split(/\s*;\s*/)
      styles.forEach((style) => {
        const [property, value] = style.split(/\s*:\s*/)
        if (property) {
          element.computedStyle[property] = value
        }
      })
    }
  })

  element.children.forEach((child) => {
    recalculateStyle(cssRules, child, element.computedStyle)
  })
}

function isShow(element) {
  let show = true
  if (['head', 'link', 'script'].includes(element.tagName)) {
    show = false
  }
  const attributes = element.attributes

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'style') {
      const styles = value.split(/\s*;\s*/)
      styles.forEach((style) => {
        const [property, value] = style.split(/\s*:\s*/)
        if (property === 'display' && value === 'none') {
          show = false
        }
      })
    }
  })
  return show
}

function createLayoutTree(element) {
  element.children = element.children.filter(isShow)
  element.children.forEach(createLayoutTree)
  return element
}

function updateLayoutTree(element, top = 0, parentTop = 0) {
  const computedStyle = element.computedStyle
  element.layout = {
    top: top + parentTop,
    left: 0,
    width: computedStyle.width,
    height: computedStyle.height,
    color: computedStyle.color,
    background: computedStyle.background,
  }

  let childrenTop = 0
  debugger
  element.children.forEach((child) => {
    updateLayoutTree(child, childrenTop, element.layout.top)
    childrenTop += parseFloat(child.computedStyle.height || 0)
  })
}

function createNewLayer(element, layers) {
  let isCreateNewLayer = true
  const attributes = element.attributes

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'style') {
      const styles = value.split(/\s*;\s*/)
      styles.forEach((style) => {
        const [property, value] = style.split(/\s*:\s*/)
        if (property === 'position' && ['fixed', 'absolute'].includes(value)) {
          updateLayoutTree(element)
          layers.push(element)
          isCreateNewLayer = false
        }
      })
    }
  })
  return isCreateNewLayer
}

function createLayerTree(element, layers) {
  // 判断子节点是否要生成新的图层，如果生成，从当前图层删除
  element.children = element.children.filter((child) =>
    createNewLayer(child, layers)
  )

  element.children.forEach((child) => createLayerTree(child, layers))
  return layers
}

function paint(element, paintStep = []) {
  const {
    top = 0,
    left = 0,
    width = 100,
    height = 0,
    color = 'black',
    background = 'white',
  } = element.layout

  if (element.type === 'text') {
    paintStep.push(`ctx.font = "20px Impact"`)
    paintStep.push(`ctx.strokeStyle = "${color}"`)
    paintStep.push(`ctx.strokeText("${element.text}", ${left}, ${top + 20})`)
  } else {
    paintStep.push(`ctx.fillStyle = "${background}"`)
    paintStep.push(
      `ctx.fillRect(${left}, ${top}, ${parseFloat(width)}, ${parseFloat(
        height
      )})`
    )
  }

  element.children.forEach((child) => paint(child, paintStep))
  return paintStep
}

function compositeLayers(layers) {
  return layers.map((layer) => {
    return paint(layer)
  })
}

function splitTiles(paintSteps) {
  return paintSteps
}

/**
 * 光栅去
 * 1个光栅去一秒处理一张
 * 10个要10秒
 *
 * 如果10个光栅去去处理10个，那就需要1秒
 *
 * 本函数也就是光栅去线程池工作
 */
function rasterThread(tile) {
  // 光栅去线程 是交给 GPU进程处理，快速光栅化，也叫GPU光栅化
  gpu.emit('raster', tile)
}

function raster(tiles) {
  tiles.forEach((tile) => {
    rasterThread(tile)
  })

  // =============================到此，位图生成完毕，通知主进程可以显示===================================
  main.emit('drawQuad')
}
