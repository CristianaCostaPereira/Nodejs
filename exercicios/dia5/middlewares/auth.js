const db = require('../db')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt

module.exports = (req, res, next) => {
  const token = req.header('Authorization') // my token (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjIzMjM4MTYxfQ.4lfAuyCaQImyuYj1gUM2tEGS0dGdP1_Ke5ByPUwVJf0)

  if (!token) {
    res.status(400).send('JWT not provided')

    return
  }

  const secret = "hello"

  try {
    const { id } = jwt.verify(token, secret) // destruturação do objecto que resultar, para só extrair o id

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
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(400).send('Invalid JWT provided')
    } else {
      res.status(401).send('Unknown error trying to verify the provided JWT')
    }
  }
}