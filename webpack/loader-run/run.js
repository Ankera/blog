const { runLoaders } = require('loader-runner')
// const runLoaders = require('./loader-runner');
const path = require('path')
const fs = require('fs')

const entryFile = path.resolve(__dirname, 'src', 'title.js')

const rules = [
  {
    test: /title\.js$/,
    // enforce: 'normal', // 默认
    use: ['normal1-loader', 'normal2-loader'],
  },
  {
    test: /title\.js$/,
    enforce: 'post',
    use: ['post1-loader', 'post2-loader'],
  },
  {
    test: /title\.js$/,
    enforce: 'pre',
    use: ['pre1-loader', 'pre2-loader'],
  },
]

const request = `inline1-loader!inline2-loader!${entryFile}`
// request.replace(/^-?!+/, '')

const parts = request.replace(/^-?!+/, '').split('!')

const resource = parts.pop()

// 把 loaders 转成绝对路径
const resolveLoader = (loader) => path.resolve(__dirname, 'loaders', loader)

const inlineLoaders = parts

const preLoaders = [],
  postLoaders = [],
  normalLoaders = []

rules.forEach((rule) => {
  if (rule.test.test(resource)) {
    if (rule.enforce === 'pre') {
      preLoaders.push(...rule.use)
    } else if (rule.enforce === 'post') {
      postLoaders.push(...rule.use)
    } else {
      normalLoaders.push(...rule.use)
    }
  }
})

/**
 * -! noPreAutoLoaders 不要前置和普通loader
 * ! noAutoLoaders 不要普通loader
 * !! noPrePostAutoLoaders 只要内联loader  inline-loader
 */
// post inline normal pre

let loaders = []
if (request.startsWith('!!')) {
  loaders = inlineLoaders
} else if (request.startsWith('-!')) {
  loaders = [...postLoaders, ...inlineLoaders]
} else if (request.startsWith('!')) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders]
}

loaders = loaders.map(resolveLoader)

debugger
runLoaders(
  {
    resource,
    loaders,
    context: { name: 'ZRY' },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    // console.log(result);
    // console.log(result.resourceBuffer.toString('utf8'));
  }
)
