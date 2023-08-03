const { request, response } = require('express')
const { uploadArchive } = require('../helpers/upload-archive.cjs')

const loadArchive = async (req = request, res = response) => {
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

  try {
    // const name = await uploadArchive(req.files, ['txt', 'md'], 'textos')
    const name = await uploadArchive(req.files, undefined, 'images')

    return res.json({
      name
    })
  } catch (msg) {
    return res.status(400).json({
      msg
    })
  }
}

module.exports = {
  loadArchive
}
