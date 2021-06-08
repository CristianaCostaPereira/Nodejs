const express = require('express')

const app = express()

const EXPRESS_PORT = 3000

module.exports = {
  bootstrap() {

    app.get('/welcome', (req, res) => {
      const { name } = req.query
      
      res.send(`Welcome ${name ? ' ' + name : ''}`)
    })

    app.post('/greeting', (req, res) => {
      const { name } = req.query
      
      res.send('Hello')
    })

    app.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
    })
  }
}