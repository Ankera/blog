const webpack = require('webpack')
const options = require('./webpack.config')

debugger
const compiler = webpack(options)
const fs = require('fs')

compiler.run((err, stats) => {
  const data = JSON.stringify(
    stats.toJson({
      modules: true,
      chunks: true,
      assets: true,
    }),
    null,
    2
  )

  fs.writeFileSync('./debugger.json', data)
})
