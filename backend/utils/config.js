if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

let port = process.env.PORT || 3001

module.exports = {
  port
}