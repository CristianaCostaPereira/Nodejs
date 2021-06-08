// require is like an import
const express = require('express')

const server = express()

const EXPRESS_PORT = 3000

module.exports = {
  // middleware: vai ser executada sempre que uma rota for chamada
  // vai dar acesso a todas a informações de get e post, da requisição
  bootstrap: (callback) => {
    server.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
      
      if (callback) {
        callback(server)
      }
    })
  }
}