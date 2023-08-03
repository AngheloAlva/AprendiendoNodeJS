require('dotenv').config() // Configuración de variables de entorno
const Server = require('./models/server') // Servidor Express

const server = new Server() // Instancia de la clase Server
server.listen() // Inicialización del servidor
