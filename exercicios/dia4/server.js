const express = require('express')

const app = express()

const EXPRESS_PORT = 3000

module.exports = {
  bootstrap() {

    app.get('/welcome', (req, res) => {
      res.send('hello')
    })

    app.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
    })
  }
}