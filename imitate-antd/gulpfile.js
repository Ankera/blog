const gulp = require('gulp')
const path = require('path')
const rimraf = require('rimraf') // rm -rf
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const merge2 = require('merge2')
// const glob = require('glob')
const { compilerOptions } = require('./tsconfig.json')

const tsConfig = {
  noUnusedParameters: true, // 不能有未使用的参数
  noUnusedLocals: true, // 不能有未使用的本地变量
  strictNullChecks: true, // 严格的 Null 检查
  target: 'ES6',
  jsx: 'react', //
  moduleResolution: 'node', //
  declaration: true, // 生成声明文件 .d.ts
  allowSyntheticDefaultImports: true, // 允许默认导入
  ...compilerOptions,
}

const babelConfig = require('./babel.config')

const source = [
  'components/**/*.{js,jsx,ts,tsx}',
  '!components/**/*.stories.{js,jsx,ts,tsx}',
  '!components/**/e2e/*',
  '!components/**/unit/*',
]

const base = path.join(process.cwd(), 'components')

function getProjectPath(filepath) {
  return path.join(process.cwd(), filepath)
}

// 编译 components 成es5 到该目录
const libDir = getProjectPath('lib')

// 编译 components 成es6 到该目录
const esDir = getProjectPath('es')

gulp.task('compile-with-es', (done) => {
  console.log('compile to es')
  compile(false).on('finish', done)
})

gulp.task('compile-with-lib', (done) => {
  console.log('compile to js')
  compile().on('finish', done)
})

gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'))

/**
 * 执行编译
 * @params {Boolean} modules
 */
function compile(modules) {
  const targetDir = modules === false ? esDir : libDir

  // 删除老的内容
  rimraf.sync(targetDir)

  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig))

  const dtsStream = dts.pipe(gulp.dest(targetDir))
  let jsStream = js
  if (modules) {
    jsStream = js.pipe(babel(babelConfig))
  }
  jsStream = jsStream.pipe(gulp.dest(targetDir))

  return merge2(jsStream, dtsStream)
}
