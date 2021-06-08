const bodyParser = require('body-parser')

const sqlInjection = require('./sql_injection')
const xss = require('./xss')

const middlewares = [
  sqlInjection,
  xss,
  bodyParser.json(),
]

module.exports = {
  // Para validar todas as chaves, seja qual for a requisição em que estou
  register(app) {
    for (const middleware of middlewares) {
      app.use(middleware)
    }
  }
}