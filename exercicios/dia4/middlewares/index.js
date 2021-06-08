const { sanitize } = require('indicative/sanitizer')

module.exports = {
  sqlInjection(req, res, next) {
    // Para validar todas as chaves, seja qual for a requisição em que estou
    const sanitizers = {}

    for (const key in req.body) {
      sanitizers[key] =  'escape'
    }

    ssnitizer(req.body, sanitizers)

    console.log(key)

    next()
  }
}