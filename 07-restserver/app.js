import 'dotenv/config'
import Server from './models/server.cjs'

const server = new Server()
server.listen()
