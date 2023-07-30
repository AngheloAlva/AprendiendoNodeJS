const express = require('express')
const cors = require('cors')

class Server {
  constructor () {
    this.PORT = process.env.PORT // 3000
    this.usersPath = '/api/users'
    this.app = express()
    this.middlewares() // Middlewares
    this.routes() // Routes
  }

  routes () {
    this.app.use(this.usersPath, require('../routes/user.routes.cjs'))
  }

  middlewares () {
    this.app.use(cors()) // CORS
    this.app.use(express.json()) // Parse JSON
    this.app.use(express.static('public')) // Public directory
  }

  listen () {
    this.app.listen(this.PORT, () => {
      console.log(`Example app listening at http://localhost:${this.PORT}`)
    })
  }
}

module.exports = Server
