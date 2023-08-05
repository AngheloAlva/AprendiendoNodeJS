const { request, response } = require('express')
const Product = require('../models/product.cjs')

const createProduct = async (req = request, res = response) => {
  const { status, user, ...body } = req.body
  const productDB = await Product.findOne({ name: body.name })

  if (productDB) {
    return res.status(400).json({
      msg: `Product ${productDB.name} already exists`
    })
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id
  }

  const newProduct = new Product(data)
  await newProduct.save()

  res.status(201).json(newProduct)
}

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = await req.query
  const query = { status: true }

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
}

const getProductById = async (req = request, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id).populate('user', 'name').populate('category', 'name')

  res.json(product)
}

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params
  const { status, user, ...data } = req.body

  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  res.json(product)
}

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params
  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  )

  res.json(productDeleted)
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}
