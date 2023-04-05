const path = require('path')
const express = require('express')
const logger = require('morgan')
const delayConfig = require('./delayConfig')

const app = express()
app.use(logger('dev'))
app.use((req, res, next) => {
  const url = req.url
  const delay = delayConfig[url]
  if (delay) {
    setTimeout(() => {
      next()
    }, delay)
  } else {
    next()
  }
})
app.use(express.static(path.join(__dirname, 'public')))

app.listen(7070, () => {
  console.log('listening on 7070 success')
})
