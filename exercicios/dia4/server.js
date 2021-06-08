const express = require('express')

const app = express()

const EXPRESS_PORT = 3000

module.exports = {
  bootstrap() {

    // middleware: vai ser executada sempre que uma rota for chamada
    // vai dar acesso a todas a informações de get e post, da requisição
    app.use((req, res, next) => {
      console.log(req.method)

      next()

    })

    app.get('/welcome', (req, res) => {
      const { name } = req.query

      res.send(`Welcome ${name ? ' ' + name : ''}`)
    })

    app.post('/greeting', (req, res) => {
      const { name } = req.query

      res.send('Hello')
    })

    app.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
    })
  }
}