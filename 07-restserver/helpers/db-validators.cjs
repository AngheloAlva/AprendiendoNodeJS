const Category = require('../models/category.cjs')
const Role = require('../models/role.cjs')
const User = require('../models/user.cjs')
const Product = require('../models/product.cjs')

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

const isCategoryByIdExist = async (id) => {
  const categoryExist = await Category.findById(id)
  if (!categoryExist) {
    throw new Error(`Category with id ${id} does not exist`)
  }
}

const isProductByIdExist = async (id) => {
  const productExist = await Product.findById(id)
  if (!productExist) {
    throw new Error(`Product whit id: ${id} does not exist`)
  }
}

module.exports = {
  isRoleValid,
  isEmailExist,
  isUserByIdExist,
  isCategoryByIdExist,
  isProductByIdExist
}
