// Referenciar um módulo sem especificar o arquivo, para no package.json olhar para este ficheiro
const server = require('./server')
const middlewares = require('./middlewares')
const routes = require('./routes')

server.bootstrap((appServer) => {
  middlewares.register(appServer)
  routes.register(appServer)
})