// Cross-site scripting (XSS) é um tipo de vulnerabilidade do sistema de segurança de um computador, que ativam ataques maliciosos ao injetarem client-side script dentro das páginas web vistas por outros users  
// To sanitize my code and prevent it to be vulnerable by allowing html tags
const { sanitize } = require('indicative/sanitizer')

module.exports = (req, res, next) => {
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
}