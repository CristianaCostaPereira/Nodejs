const auth = require('../middlewares/auth')

const usersRouter = require('./internal/users')
const todosRouter = require('./internal/todos')

const login = require('./public/login')

module.exports = {
  register(app) {
    app.use('/users', auth, usersRouter)
    app.use('/todos', auth, todosRouter)
    
    app.post('/login', login)
  }
}