// require is like an import
const express = require('express')

const server = express()

const EXPRESS_PORT = 3000

module.exports = {
  // bootstrap é uma propriedade que invoca uma função
  bootstrap: (callback) => {
    server.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
      
      if (callback) {
        callback(server)
      }
    })
  }
}