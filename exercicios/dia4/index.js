// Referenciar um módulo sem especificar o arquivo, para no package.json olhar para este ficheiro

const db = require('./db')
const server = require('./server')
const middlewares = require('./middlewares')
const routes = require('./routes')

// Responsável por arrancar a nossa BD
db.start((_) => {
  server.bootstrap((app) => {
    middlewares.register(app)
    routes.register(app)
  })
})