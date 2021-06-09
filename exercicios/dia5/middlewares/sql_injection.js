// To sanitize my code and prevent it to be vulnerable to SQL injections
const { sanitize } = require('indicative/sanitizer')

module.exports = (req, res, next) => {
  const sanitizers = {}

  // Para validar todas as chaves, seja qual for a requisição em que estou
  // for..in returns a list of keys on the object being iterated,
  for (const key in req.body) {
    sanitizers[key] = 'escape'
  }

  sanitize(req.body, sanitizers)

  for (const key in req.query) {
    sanitizers[key] = 'escape'
  }

  sanitize(req.query, sanitizers)

  next()
}