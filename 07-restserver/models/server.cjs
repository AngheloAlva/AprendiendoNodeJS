const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config.db.cjs')

class Server {
  constructor () {
    this.PORT = process.env.PORT // 3000
    this.usersPath = '/api/users'
    this.authPath = '/api/auth'
    this.app = express()
    this.connectDB() // Database
    this.middlewares() // Middlewares
    this.routes() // Routes
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.authPath, require('../routes/auth.routes.cjs'))
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
