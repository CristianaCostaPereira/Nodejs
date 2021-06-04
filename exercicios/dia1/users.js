const users = []

module.exports = (app) => {
  app.get('/users', (req, res) => {
      res.send({
        code: 200,
        meta: {
          pagination: {
            total: users.length,
            pages: 1,
            page: 1,
            limit: undefined
          }
        },
        data: users 
      })
  })

  // Get user by id
  app.get('/users/:id', (req, res) => {

    // find(): Get the value of the first element in the array
    const user = users.find((user) => user.id == req.params.id)

    res.send(user)
  })

  // Create new user
  app.post('/users', (req, res) => {
    const user = req.body // represents one user

    user.id = users.length + 1 // creates the property id in my object

    users.push(user) // inserts into my []

    res.send(user) // returns the inserted user {}
  })

  // Update user
  app.put('/users/:id', (req, res) => {
    const { id } = req.params // the same as const id = req.params.id

    const data = req.body

    const user = users.find((user) => user.id == id)

    Object.assign(user, data) // applies all properties inside of the object

    res.send(user)
  })

  app.patch('/users/:id/activated', (req, res) => {
    const { id } = req.params

    const { isActive } = req.body

    const user = users.find((user) => user.id == id)

    if (isActive) {
      user.status = 'Active'
    } else {
      user.status = 'Inactive'
    }

    res.send(user)
  })

  app.delete('/users/:id/', (req, res) => {
    const { id } = req.params

    const userIndex = users.findIndex((user) => user.id == id) // returns the index of the first element in the array that matches the condition or -1 if no match was found

    const user = users[userIndex] // gives the element in the users [], it is a number

    if (userIndex !== -1) {
      users.splice(userIndex, 1) // removes one element from the []
    }

    res.send(user)
  })
}