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
}