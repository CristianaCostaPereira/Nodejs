// Referenciar um módulo sem especificar o arquivo, para no package.json olhar para este ficheiro
const server = require('./server')
const middlewares = require('./middlewares')
const routes = require('./routes')

// the 'appServer or app' bellow is the same as our server
server.bootstrap((appServer) => {
  middlewares.register(appServer)
  routes.register(appServer)
})