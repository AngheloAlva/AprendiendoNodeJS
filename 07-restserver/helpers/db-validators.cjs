const Role = require('../models/role.cjs')
const User = require('../models/user.cjs')

const isRoleValid = async (role = '') => {
  const roleExist = await Role.findOne({ role })
  if (!roleExist) {
    throw new Error(`Role ${role} is not valid`)
  }
}

const isEmailExist = async (email = '') => {
  const existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new Error(`Email ${email} already exist`)
  }
}

const isUserByIdExist = async (id) => {
  const userExist = await User.findById(id)
  if (!userExist) {
    throw new Error(`User with id ${id} does not exist`)
  }
}

module.exports = {
  isRoleValid,
  isEmailExist,
  isUserByIdExist
}
