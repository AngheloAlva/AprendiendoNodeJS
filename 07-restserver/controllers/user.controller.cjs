// const { response } = require('express')

const userGet = (req, res) => {
  const { id, name, etc } = req.query

  res.json({
    msg: 'get API - controller',
    id,
    name,
    etc
  })
}

const userPost = (req, res) => {
  res.json({
    msg: 'post API - controller'
  })
}

const userPut = (req, res) => {
  const id = req.params.id

  res.json({
    msg: 'put API - controller',
    id
  })
}

const userPatch = (req, res) => {
  res.json({
    msg: 'patch API - controller'
  })
}

const userDelete = (req, res) => {
  res.json({
    msg: 'delete API - controller'
  })
}

module.exports = {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete
}
