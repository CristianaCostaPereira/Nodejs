const { Router } = require('express')

const router = Router()

router.get('/welcome', (req, res) => {
  const { name } = req.query

  res.send(`Welcome ${name ? ' ' + name : ''}`)
})

router.post('/greeting', (req, res) => {
  const { name } = req.query

  res.send('Hello')
})