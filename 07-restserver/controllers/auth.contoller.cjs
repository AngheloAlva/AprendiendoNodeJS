const { response } = require('express')
const User = require('../models/user.cjs')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT.cjs')

const login = async (req, res = response) => {
  const { email, password } = req.body

  // Verify if email exist
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({
      msg: 'User / Password are not correct - email'
    })
  }

  // Verify if user is active
  if (!user.status) {
    return res.status(400).json({
      msg: 'User / Password are not correct - status: false'
    })
  }

  // Verify password
  const validPassword = bcryptjs.compareSync(password, user.password)
  if (!validPassword) {
    return res.status(400).json({
      msg: 'User / Password are not correct - password'
    })
  }

  // Generate JWT (Json Web Token)
  const token = await generateJWT(user.id)

  try {
    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Something went wrong'
    })
  }
}

module.exports = {
  login
}
