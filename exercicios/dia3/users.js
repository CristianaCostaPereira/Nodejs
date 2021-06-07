const { sanitize } = require('indicative/sanitizer')
const { validate, validations } = require('indicative/validator')

module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    const { page, limit } = req.query

    db.query('SELECT COUNT(*) FROM users', (error, results) => {
      if (error) {
        throw error
      }

      const count = results[0]['COUNT(*)']
      const limitAsNumber = Number(limit)
      const pageAsNumber = Number(page)
      const offset = Number((pageAsNumber - 1) * limit)

      db.query('SELECT * FROM users LIMIT ?, ?', [offset, limitAsNumber], (error, results, _) => {
        if (error) {
          throw error
        }

        const pages = Math.ceil(count / limit) // para não permitir que a minha paginação venha com casas decimais

        res.send({
          code: 200,
          meta: {
            pagination: {
              total: count,
              pages: pages,
              page: pageAsNumber,
            }
          },
          data: results,
        })
      })
    })
  })

  // Validations
  app.post("/users", (req, res) => {
    const user = req.body

    const rules = {
      name: [
        validations.required,
        validations.regex(['^[a-zA-Z0-9\\s]+$'])
      ],
      email: 'required|email',
      gender: 'required|number',
      status: 'boolean',
      username: 'required|alphaNumeric',
      phone: [
        validations.required,
        validations.regex(['^((\\+|00)\\d{1,3}\\s{1})?\\d{9}$']),
      ],
    }

    const sanitizationRules = {
      name: 'trim|escape|strip_tags',
      email: 'trim|lowerCase|escape|strip_tags',
      gender: 'escape|strip_tags',
      status: 'escape|strip_tags',
      username: 'trim|lowerCase|escape|strip_tags',
      phone: 'trim|escape|strip_tags'
    }

    validate(user, rules).then(() => {
      sanitize(user, sanitizationRules)
      
      db.query("INSERT INTO users SET ?", [user], (error, results, _) => {
        if (error) {
          res.status(400).send(error)
          throw error
        }
  
        const { insertId } = results;
  
        db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [insertId], (error, results, _) => {
          if (error) {
            res.status(400).send(error)
            throw error
          }

          res.send(results[0])
        })
      })

    }).catch((error) => {
      res.status(400).send(error)
    })
  });
}