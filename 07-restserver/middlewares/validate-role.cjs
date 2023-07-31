const { response } = require('express')

const isAdminRole = (req, res = response) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'User is not verified'
    })
  }

  const { role } = req.user

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: 'User is not authorized'
    })
  }
}

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'User is not verified'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `User must have one of these roles: ${roles}`
      })
    }

    next()
  }
}

module.exports = {
  isAdminRole,
  hasRole
}
