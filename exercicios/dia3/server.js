const express = require ('express')
const bodyParser = require('body-parser')
const mysql = require ('mysql2')

// import JS files
const users = require('./users')
const todos = require('./todos')

const PORT = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: 'localhost', // Could be an IP
  user: 'root',
  password: 'Admin123',
  database: 'notes_app',
})

db.connect((error) => {
  if (error) {
    throw error
  }

  users(app, db)
  todos(app, db)

  app.get('/welcome', (req, res) => {
    // destruturação permite que não tenha de chamar .name no fim
    const {name} = req.query

    res.send(`Welcome ${name} :)`)
  })

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
})