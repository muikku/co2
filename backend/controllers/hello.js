const hello = require('express').Router()


hello.get('/', async (req, res) => {
  res.json('welcome to co2app api')
})


module.exports = hello