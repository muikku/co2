const co2Router = require('express').Router()

co2Router.get('/', async (req, res) => {
    const notactualdata = ["potatoes", "potatos"]
  res.json(notactualdata)
})

module.exports = co2Router