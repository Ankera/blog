const EventEmitter = require('events')
const http = require('http')

class NetWork extends EventEmitter {
  fetchResource(options) {
    return new Promise(function (resolve, reject) {
      const request = http.request(options, (response) => {
        const buffers = []
        const header = response.headers
        response.on('data', (buffer) => {
          buffers.push(buffer)
        })

        response.on('end', () => {
          resolve({
            headers: response.headers,
            body: Buffer.concat(buffers).toString(),
          })
        })
      })

      request.end()
    })
  }
}

const network = new NetWork()

module.exports = network
