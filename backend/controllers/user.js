const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
  res.json('userROuter')
})

module.exports = userRouter