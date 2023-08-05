const { request, response } = require('express')

const archiveValidator = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      msg: 'No files were uploaded.'
    })
  }

  next()
}

module.exports = {
  archiveValidator
}
