const express = require ('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const users = []
const todos = []

const PORT = 3000


app.get('/welcome', (req, res) => {
  // destruturação permite que não tenha de chamar .name no fim
  const {name} = req.query

  res.send(`Welcome ${name} :)` )
})

app.get('/todos', (req, res) => {
  res.send({
    code: 200,
    meta: {
      pagination: {
        total: 0,
        pages: 0,
        page: 0,
        limit: 0.
      }
    },
    data: [
      {
        id: 95,
        user_id: 62,
        title: "Agnitio volva tamen stultus aut",
        completed: false
      }
    ]
  })
})

app.get('/todos/:id', (req, res) => {
  const {id} = req.params

  console.log(id);

  res.send({
    id: id,
    user_id: 62,
    title: "Agnitio volva tamen stultus aut",
    completed: false
  })
})

app.get('/users', (req, res) => {
  res.send({
    code: 200,
    meta: {
      pagination: {
        total: 1800,
        pages: 90,
        page: 1,
        limit: 20
      },

      data: users
    }
  })
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  const user = users.find((user) => user.id == id)[0] //returns an array

  res.send(user)
})

app.post('/users', function(req, res) {
  const id = users.length + 1

  const data = req.body // represents one user

  data.id = id

  users.push(data)

  res.send(data)
})

app.listen(PORT, () => {
  console.log('Listening on port 3000');
})