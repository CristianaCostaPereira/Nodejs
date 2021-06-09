const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // Para importar o pacote

const db = require('../../db')

module.exports = (req, res) => {
  validate(req.body, {
    email: 'required|email',
    password: 'required'
  }).then((value) => {
    db.query('SELECT * FROM users WHERE email = ? AND status != 0', [value.email], (error, results) => {
      if (results.length === 0) {
        res.status(400).send('Cannot find any account that matches the given email and password')
      } else {
        bcrypt.compare(value.password, results[0].password)
          .then((match) => {
            if (match) {
              const secret = "hello"

              delete results[0].password // para não ter de ser preciso a row na BD

              // sign para criptografar um valor usando o secret
              const token = jwt.sign({id: results[0].id}, secret) // will give me my token

              res.send(token)

            } else {
              res.status(400).send('Cannot find any account that matches the given email and password')
            }
          }).catch((error) => { throw error })
      }
    })
  }).catch((error) => res.status(400).send(error))
}