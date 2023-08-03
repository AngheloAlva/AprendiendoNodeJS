const express = require('express') // Express
const cors = require('cors') // CORS

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.server = require('http').createServer(this.app)
    this.io = require('socket.io')(this.server)
    this.paths = {}
    this.middlewares() // Middlewares
    this.routes() // Rutas de mi aplicación
    this.sockets() // Configuración de sockets
  }

  middlewares () {
    this.app.use(cors()) // CORS
    this.app.use(express.static('public')) // Directorio Público
  }

  routes () {
  }

  sockets () {
    this.io.on('connection', socket => {
      console.log('Cliente conectado', socket.id)

      socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
      })
    })
  }

  listen () {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
