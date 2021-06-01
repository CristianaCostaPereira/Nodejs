const express = require ('express')
// const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

// app.use(bodyParser.json)
// app.use(bodyParser.urlencoded({ extended: true }))


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

app.listen(PORT, () => {
  console.log('Listening on port 3000');
})