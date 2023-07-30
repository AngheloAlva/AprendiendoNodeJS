// const { response } = require('express')
const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user.cjs')

const userGet = async (req, res) => {
  const { limit = 5, from = 0 } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  const salt = bcryptjs.genSaltSync() // Generate salt
  user.password = bcryptjs.hashSync(password, salt) // Encrypt password with bcryptjs (10 is the number of rounds)

  await user.save()

  res.json({
    user
  })
}

const userPut = async (req, res) => {
  const id = req.params.id
  const { _id, password, google, email, ...remaining } = req.body

  if (password) {
    const salt = bcryptjs.genSaltSync()
    remaining.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, remaining)

  res.json({
    msg: 'put API - controller',
    user
  })
}

const userPatch = (req, res) => {
  res.json({
    msg: 'patch API - controller'
  })
}

const userDelete = async (req, res) => {
  const { id } = req.params
  // const user = await User.findByIdAndDelete(id)
  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json({
    user
  })
}

module.exports = {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete
}
