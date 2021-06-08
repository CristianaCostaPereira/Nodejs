const { validate } = require('indicative/validator')

const db = require('../../db')

module.exports = (req, res) => {
  validate(req.body, {
    email: 'required|email',
    password: 'required'

  }).then((value) => {
    db.query('SELECT * FROM users WHERE email = ? AND password = ? AND status != 0', [value.email, value.password], (error, results) => {
      if (results.length === 0) {
        res.status(400).send('Cannot find any account that matches the given email and password')

      } else {
        res.send((results[0].id + 483274952349).toString())
      }
    })
  }).catch((error) => res.status(400).send(error))
}