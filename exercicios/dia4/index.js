// Referenciar um módulo sem especificar o arquivo, para no package.json olhar para este ficheiro

const db = require('./db')
const server = require('./server')
const middlewares = require('./middlewares')
const routes = require('./routes')

// Responsável por arrancar a nossa BD
// the 'app' bellow is the same as our server
// bootstrap é uma propriedade que invoca uma função
db.start(() => {
  server.bootstrap((appServer) => {
    middlewares.register(appServer)
    routes.register(appServer)
  })
})