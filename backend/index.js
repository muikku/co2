const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')

const unzipAndParseRouter = require('./controllers/unzipAndParse')

const config = require('./utils/config')


app.use(cors())
app.use(bodyParser.json())

/* mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise */


app.use('/api/unzipAndParse', unzipAndParseRouter)


/* app.use(express.static('build')) */


app.use(middleware.logger)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}