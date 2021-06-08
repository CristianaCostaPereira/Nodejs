const { sanitize } = require('indicative/sanitizer')

module.exports = {
  sqlInjection(req, res, next) {
    const sanitizers = {}

    // Para validar todas as chaves, seja qual for a requisição em que estou
    for (const key in req.body) {
      sanitizers[key] = 'escape'
    }
    
    sanitize(req.body, sanitizers)
    
    for (const key in req.query) {
      sanitizers[key] = 'escape'
    }

    sanitize(req.query, sanitizers)

    next()
  },
  xssProtection(req, res, next) {
    const sanitizers = {}

    for (const key in req.body) {
      sanitizers[key] = 'strip_tags'
    }

    sanitize(req.body, sanitizers)
    
    for (const key in req.query) {
      sanitizers[key] = 'strip_tags'
    }

    sanitize(req.query, sanitizers)

    next()
  },
}