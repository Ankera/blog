let render = () => {
  const title = require('./title.js')

  const root = document.getElementById('root')

  root.innerHTML = title
}

render()

if (module.hot) {
  module.hot.accept(['./title.js'], render)
}
