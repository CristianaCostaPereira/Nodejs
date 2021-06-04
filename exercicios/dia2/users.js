const users = [];

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

  app.patch("/users/:id/activated", (req, res) => {
    const { id } = req.params;

    const { isActive } = req.body;

    const user = users.find((user) => user.id == id);

    if (isActive) {
      user.status = "Active";
    } else {
      user.status = "Inactive";
    }

    res.send(user);
  });

  app.delete("/users/:id/", (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id == id); // returns the index of the first element in the array that matches the condition or -1 if no match was found

    const user = users[userIndex]; // gives the element in the users [], it is a number

    if (userIndex !== -1) {
      users.splice(userIndex, 1); // removes one element from the []
    }

    res.send(user);
  });
};
