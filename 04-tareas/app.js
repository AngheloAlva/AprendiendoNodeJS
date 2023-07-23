import colors from 'colors'
import { inquirerMenu } from './helpers/inquirer'


// const { mostrarMenu, pausa } = require('./helpers/mensajes')

const main = async () => {
  let opt = ''
  
  do {
    opt = await inquirerMenu()    
  } while (opt !== '0')
}

main()
