const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Token could not be generated')
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  generateJWT
}
