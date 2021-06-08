const { Router } = require('express')

const router = Router()

router.get('/welcome', (req, res) => {
  const { name } = req.query

  res.send(`Welcome ${name ? ' ' + name : ''}`)
})

router.post('/users', (req, res) => {
  const data = req.body

  res.send(data)
})