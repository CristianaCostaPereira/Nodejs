const db = require('../db')

module.exports = (req, res, next) => {
  const authorization = req.header('Authorization')

  const id = +authorization - 483274952349

  db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }

    if (results.length === 0) {
      res.status(401).send('You don\'t have enough privilegies to access this resource')
    } else {
      next()
    }
  })
}