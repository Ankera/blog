const path = require('path')
const mime = require('mime')

/**
 * 负责提供产出文件的预览
 */
function wrapper({ fs, outputPath }) {
  return (req, res, next) => {
    let url = req.url
    if (url === '/') {
      url = '/index.html'
    }
    const filename = path.join(outputPath, url)

    try {
      let stat = fs.statSync(filename)
      if (stat.isFile()) {
        const content = fs.readFileSync(filename, 'utf8')

        // res.setHeader('Content-Type', 'text/javascript')
        res.setHeader('Content-Type', mime.getType(filename))
        res.send(content)
      } else {
        res.sendStatus(404)
      }
    } catch (error) {
      res.sendStatus(404)
    }
  }
}

module.exports = wrapper
