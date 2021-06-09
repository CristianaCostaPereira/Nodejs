const db = require('../db')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization') // my token (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMjM4MTYxfQ.4lfAuyCaQImyuYj1gUM2tEGS0dGdP1_Ke5ByPUwVJf0)
  const secret = "hello"

  const { id }  = jwt.verify(token, secret) // destruturação do objecto que resultar, para só extrair o id

  db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }

    // If the id does not exist / not valid
    if (results.length === 0) {
      res.status(401).send('You don\'t have enough privilegies to access this resource')

    } else {
      next()
    }
  })
}