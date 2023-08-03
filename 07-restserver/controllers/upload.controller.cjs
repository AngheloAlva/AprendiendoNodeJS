const { request, response } = require('express')
const path = require('path')

const loadArchive = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      msg: 'No files were uploaded.'
    })
  }

  if (!req.files.archive) {
    return res.status(400).send({
      msg: 'No files were uploaded.'
    })
  }

  const { archive } = req.files
  const uploadPath = path.join(__dirname, '../uploads/', archive.name)

  archive.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err })
    }

    res.send('File uploaded to ' + uploadPath)
  })
}

module.exports = {
  loadArchive
}
