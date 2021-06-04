module.exports = (app, db) => {
  app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (error, results, fields) => {
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
  });

  // Get user by id
  app.get("/users/:id", (req, res) => {
    const { id } = req.params;

    // LIMIT para irmos buscar um único resultado
    db.query(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id],
      (error, results, _) => {
        if (error) {
          throw error;
        }
        res.send(results[0]); // pega no primeiro elemento e retorna
      }
    );
  });

  // Create new user
  app.post("/users", (req, res) => {
    const user = req.body;

    db.query("INSERT INTO users SET ?", [user], (error, results, _) => {
      if (error) {
        throw error;
      }

      const { insertId } = results;

      db.query("SELECT * FROM users WHERE id = ? LIMIT 1", [insertId], (error, results, _) => {
          if (error) {
            throw error;
          }

          res.send(results[0]);
        }
      );
    });
  });

  // Update user
  app.put("/users/:id", (req, res) => {
    const { id } = req.params

    const user = req.body

    // SET so we do not have to write all the params in my object

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
  });

  // Just chages ONE property
  app.patch("/users/:id/activated", (req, res) => {
    const { id } = req.params

    const { isActive } = req.body

    const status = isActive ? 1 : 0

    db.query('UPDATE users SET status = ? WHERE id = ?', [status, id], (error, results, _) => {
      if (error) {
        throw error
      }

      res.send(isActive)
    })
  });

  app.delete("/users/:id/", (req, res) => {
    const { id } = req.params

    db.query('SELECT * FROM users WHERE id = ?', [id], (error, results, _) => {
      if (error) {
        throw error
      }

      const [user] = results

      db.query('DELETE FROM users WHERE id = ?', [id], (error, _, __) => {
        if (error) {
          throw error
        }

        res.send(user)
      })
    })
  })
}