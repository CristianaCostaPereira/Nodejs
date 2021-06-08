const publicRoutes = require('./public')

module.exports = {
  register(app) {
    app.use(publicRoutes)
  }
}