const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config.db.cjs')
const fileUpload = require('express-fileupload')
const { socketController } = require('../sockets/socket.controller.cjs')

class Server {
  constructor () {
    this.app = express()
    this.PORT = process.env.PORT // 3000
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)

    this.usersPath = '/api/users'
    this.authPath = '/api/auth'
    this.categoriesPath = '/api/categories'
    this.productsPath = '/api/products'
    this.searchPath = '/api/search'
    this.uploadsPath = '/api/uploads'

    this.connectDB() // Database
    this.middlewares() // Middlewares
    this.routes() // Routes
    this.sockets() // Sockets
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.authPath, require('../routes/auth.routes.cjs'))
    this.app.use(this.categoriesPath, require('../routes/categories.routes.cjs'))
    this.app.use(this.productsPath, require('../routes/products.routes.cjs'))
    this.app.use(this.uploadsPath, require('../routes/uploads.routes.cjs'))
    this.app.use(this.usersPath, require('../routes/user.routes.cjs'))
    this.app.use(this.searchPath, require('../routes/search.routes.cjs'))
  }

  middlewares () {
    this.app.use(cors()) // CORS
    this.app.use(express.json()) // Parse JSON
    this.app.use(express.static('public')) // Public directory
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    })) // File upload - Express fileupload
  }

  sockets () {
    this.io.on('connection', socketController)
  }

  listen () {
    this.server.listen(this.PORT, () => {
      console.log(`Example app listening at http://localhost:${this.PORT}`)
    })
  }
}

module.exports = Server
