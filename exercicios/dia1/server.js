const express = require ('express')
const bodyParser = require('body-parser')

// import JS files
const users = require('./users')
const todos = require('./todos')

const PORT = 3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

users(app)
todos(app)


app.get('/welcome', (req, res) => {
  // destruturação permite que não tenha de chamar .name no fim
  const {name} = req.query

  res.send(`Welcome ${name} :)`)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})