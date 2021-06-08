const usersRouter = require('./internal/users')
const todosRouter = require('./internal/todos')

const login = require('./public/login')

module.exports = {
  register(app) {
    app.use('/users', usersRouter)
    app.use('/todos', todosRouter)

    app.post('/login', login)
  }
}