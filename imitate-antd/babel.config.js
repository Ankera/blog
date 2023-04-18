module.exports = {
  presets: [
    '@babel/preset-react', // 把 react 转 ES5
    [
      '@babel/preset-env', // 把 ES6 转 ES5
      {
        modules: 'auto',
        targets: {
          browsers: ['last 2 versions', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript', // 支持 typescript
      {
        isTSX: true,
      },
    ],
    ['@babel/plugin-transform-runtime'],
  ],
}
