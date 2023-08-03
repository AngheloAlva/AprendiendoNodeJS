const { v4: uuidv4 } = require('uuid')
const path = require('path')

const uploadArchive = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
  return new Promise((resolve, reject) => {
    const { archive } = files
    const newName = archive.name.split('.')
    const extension = newName[newName.length - 1]

    if (!validExtensions.includes(extension)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject(`Invalid extension. Valid extensions: ${validExtensions.join(', ')}`)
    }

    const tempName = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName)

    archive.mv(uploadPath, (err) => {
      if (err) {
        return reject(err)
      }

      resolve(tempName)
    })
  })
}

module.exports = {
  uploadArchive
}
