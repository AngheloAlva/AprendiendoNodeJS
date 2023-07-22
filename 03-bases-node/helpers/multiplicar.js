const fs = require('fs')
const colors = require('colors')

const crearArchivo = async ( base = 5, listar, hasta ) => {
  try {
    let salida, consola = ''
  
    listar && (
      console.log('===================='.rainbow),
      console.log(`   Tabla del:`.brightYellow, colors.brightYellow(base)),
      console.log('===================='.rainbow)
    )
    
    for (let i = 1; i <= hasta; i++) {
      consola += (`${base} ${'x'.cyan} ${i} ${'='.cyan} ${base * i} \n`)
      salida += (`${base} x ${i} = ${base * i} \n`)
    }
    listar && console.log(consola)
    
    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida)
  
    return `tabla-${base}.txt`
    
  } catch (err) {
    throw err
  }
}

module.exports = {
  crearArchivo
}