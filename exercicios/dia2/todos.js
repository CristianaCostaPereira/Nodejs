const todos = []

module.exports = (app, db) => {
  app.get('/todos', (req, res) => {
    db.query("SELECT * FROM todos", (error, results, fields) => {
      if (error) {
        throw error;
      }

      res.send({
        code: 200,
        meta: {
          pagination: {
            total: results.length,
            pages: 1,
            page: 1,
            limit: undefined,
          },
        },
        data: results,
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
    const todo = req.body // represents one todo

    todo.id = todos.length + 1

    todos.push(todo)

    res.send(todo)
  })
}