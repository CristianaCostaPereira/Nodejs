module.exports = (app, db) => {
  // get all todos
  app.get('/todos', (req, res) => {
    const { page, limit } = req.query
    const _limit = +limit // passar para string
    const _page = +page

    db.query("SELECT COUNT(id) FROM todos", (error, countResults, fields) => {
      if (error) {
        throw error;
      }

      const offset = (_page - 1) * _limit
      const total = countResults[0]['COUNT(id)']
      const pageCount = Math.ceil(total / limit)

      // primeiro ? é o offset, o segundo é os resultados
      db.query("SELECT * FROM todos LIMIT ?, ?", [offset, _limit], (error, results, fields) => {
        if (error) {
          throw error;
        }

        res.send({
          code: 200,
          meta: {
            pagination: {
              total: total,
              pages: pageCount,
              page: _page,
              limit: _limit,
            },
          },
          data: results,
        });
      });
    });
  })

  app.get('/todos/:id', (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM todos WHERE id = ? LIMIT 1", [id], (error, results, _) => {
      if (error) {
        throw error;
      }
      res.send(results[0]); // pega no primeiro elemento e retorna
      }
    );
  })

  app.post('/todos', (req, res) => {
    const todo = req.body;

    db.query("INSERT INTO todos SET ?", [todo], (error, results, _) => {
      if (error) {
        throw error;
      }

      const { insertId } = results;

      db.query("SELECT * FROM todos WHERE id = ? LIMIT 1", [insertId], (error, results, _) => {
          if (error) {
            throw error;
          }

          res.send(results[0]);
        }
      );
    });
  })

  app.put("/todos/:id", (req, res) => {
    const { id } = req.params

    const todo = req.body

    db.query('UPDATE todos SET ? WHERE id = ?', [todo, id], (error, results, _) => {
      if (error) {
        throw error
      }

      db.query('SELECT * FROM todos WHERE id = ? LIMIT 1', [id], (error, results, _) => {
        if (error) {
          throw error
        }

        res.send(results[0])
      })
    })
  });

  app.patch("/todos/:id/completed", (req, res) => {
    const { id } = req.params

    const { isCompleted } = req.body

    const completed = isCompleted ? 1 : 0

    db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (error, results, _) => {
      if (error) {
        throw error
      }

      res.send(isCompleted)
    })
  });

  app.delete("/todos/:id/", (req, res) => {
    const { id } = req.params

    db.query('SELECT * FROM todos WHERE id = ?', [id], (error, results, _) => {
      if (error) {
        throw error
      }

      const [todo] = results

      db.query('DELETE FROM todos WHERE id = ?', [id], (error, _, __) => {
        if (error) {
          throw error
        }

        res.send(todo)
      })
    })
  })

  // Get todos by user id
  app.get('/users/:id/todos', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM todos WHERE user_id = ?', [id], (error, results, _) => {
      if (error) {
        throw error;
      }
      res.send(results);
      }
    );
  })
}