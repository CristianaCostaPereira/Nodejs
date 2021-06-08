const { Router } = require('express')

const router = Router()

router.get('/welcome', (req, res) => {
  const { name, age } = req.query
  
  res.send(`Welcome${name ? ' ' + name + ' ' + age : ''}`)
})

router.post('/users/:id', (req, res) => {
  const data = req.body

  res.send(data)
})

module.exports = router