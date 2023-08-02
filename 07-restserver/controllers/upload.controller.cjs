const { request, response } = require('express')

const loadArchive = (req = request, res = response) => {
  res.json({
    msg: 'Archivo cargado correctamente'
  })
}

module.exports = {
  loadArchive
}
