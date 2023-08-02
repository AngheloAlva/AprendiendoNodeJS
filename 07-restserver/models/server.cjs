const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config.db.cjs')

class Server {
  constructor () {
    this.app = express()
    this.PORT = process.env.PORT // 3000

    this.usersPath = '/api/users'
    this.authPath = '/api/auth'
    this.categoriesPath = '/api/categories'
    this.productsPath = '/api/products'
    this.searchPath = '/api/search'

    this.connectDB() // Database
    this.middlewares() // Middlewares
    this.routes() // Routes
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.authPath, require('../routes/auth.routes.cjs'))
    this.app.use(this.categoriesPath, require('../routes/categories.routes.cjs'))
    this.app.use(this.productsPath, require('../routes/products.routes.cjs'))
    this.app.use(this.usersPath, require('../routes/user.routes.cjs'))
    this.app.use(this.searchPath, require('../routes/search.routes.cjs'))
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
