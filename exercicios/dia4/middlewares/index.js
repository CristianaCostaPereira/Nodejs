const bodyParser = require('body-parser')

const sqlInjectionProtection = require('./sql_injection')
const xssProtection = require('./xss')

const middlewares = [
  sqlInjectionProtection,
  xssProtection,
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