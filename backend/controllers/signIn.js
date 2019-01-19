const signInRouter = require('express').Router()

signInRouter.get('/', async (req, res) => {
  res.json('signInROuter')
})

module.exports = signInRouter