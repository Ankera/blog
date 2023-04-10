let render = () => {
  const title = require('./title.js')

  const root = document.getElementById('root')

  root.innerHTML = `
    <input type="text" id="text" />
    <h1>${title} 1</h1>
  `
}

render()

if (module.hot) {
  module.hot.accept(['./title.js'], render)
}
