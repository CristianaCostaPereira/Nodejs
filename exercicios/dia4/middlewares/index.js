const bodyParser = require('body-parser')

const sqlInjection = require('./sql_injection')
const xss = require('./xss')

const middlewares = [
  bodyParser.json(), // disponibiliza-nos o corpo da requisição, o nosso req.body. Tem de ser sempre o mais independante para o mais depedente
  sqlInjection,
  xss
]

module.exports = {
  // Para validar todas as chaves, seja qual for a requisição em que estou
  register(app) {
    for (const middleware of middlewares) {
      app.use(middleware)
    }
  }
}