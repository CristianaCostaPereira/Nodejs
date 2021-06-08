const router = require('express').Router()
const db = require('../../db')

const auth = require('../../middlewares/auth')

router.get('/', auth, (req, res) => {
  const { page, limit } = req.query

  db.query('SELECT COUNT(*) FROM users', (error, results) => {
    if (error) {
      throw error
    }

    const count = results[0]['COUNT(*)']
    const _limit = Number(limit) || 20
    const _page = Number(page) || 1

    const offset = (_page - 1) * _limit

    db.query('SELECT * FROM users LIMIT ?, ?', [offset, _limit], (error, results, _) => {
      if (error) {
        throw error
      }

      const pages = Math.ceil(count / _limit)

      res.send({
        code: 200,
        meta: {
          pagination: {
            total: count,
            pages: pages,
            page: _page,
          }
        },
        data: results,
      })
    })
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
    if (error) {
      throw error
    }

    res.send(results[0])
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params

  const user = req.body

  db.query('UPDATE users SET ? WHERE id = ?', [user, id], (error, results, _) => {
    if (error) {
      throw error
    }

    db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
      if (error) {
        throw error
      }

      res.send(results[0])
    })
  })
})

module.exports = router