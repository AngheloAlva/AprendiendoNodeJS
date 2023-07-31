const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user.cjs')

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY)
    req.uid = uid

    // Verify if user exists in DB
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: 'User does not exist in DB'
      })
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'User is not authorized - status: false'
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}

module.exports = {
  validateJWT
}
