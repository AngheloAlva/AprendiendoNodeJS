const { request, response } = require('express')
const { v4: uuidv4 } = require('uuid')
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

  const newName = archive.name.split('.')
  const extension = newName[newName.length - 1]

  const extensions = ['png', 'jpg', 'jpeg', 'gif']

  if (!extensions.includes(extension)) {
    return res.status(400).send({
      msg: 'Invalid extension. Valid extensions: ' + extensions.join(', ')
    })
  }

  const tempName = uuidv4() + '.' + extension
  const uploadPath = path.join(__dirname, '../uploads/', tempName)

  archive.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err })
    }

    res.send('File uploaded tos' + uploadPath)
  })
}

module.exports = {
  loadArchive
}
