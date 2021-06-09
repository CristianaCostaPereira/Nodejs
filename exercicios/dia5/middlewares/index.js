const bodyParser = require('body-parser')

const sqlInjection = require('./sql_injection')
const xss = require('./xss')

// middleware: vai ser executada sempre que uma rota for chamada
// vai dar acesso a todas a informações de get e post da requisição
const middlewares = [
  bodyParser.json(), // disponibiliza-nos o corpo da requisição, o nosso req.body. Tem de ser sempre do mais independante para o mais depedente
  sqlInjection,
  xss
]

// for..of returns a list of values of the numeric properties of the object being iterated
module.exports = {
  register(app) {
    for (const middleware of middlewares) {
      app.use(middleware)
    }
  }
}