/* eslint-disable camelcase */
const path = require('path')
const fs = require('fs')
const { request, response } = require('express')
const { uploadArchive } = require('../helpers/upload-archive.cjs')
const User = require('../models/user.cjs')
const Product = require('../models/product.cjs')
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)

const loadArchive = async (req = request, res = response) => {
  try {
    // const name = await uploadArchive(req.files, ['txt', 'md'], 'textos')
    const name = await uploadArchive(req.files, undefined, 'images')
    res.json({
      name
    })
  } catch (msg) {
    res.status(400).json({
      msg
    })
  }
}

const updateImage = async (req = request, res = response) => {
  const { collection, id } = req.params
  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with the id ${id}`
        })
      }
      break
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with the id ${id}`
        })
      }
      break
    default:
      return res.status(500).json({
        msg: 'I forgot to validate this'
      })
  }

  // Clean previous images
  if (model.img) {
    const imagePath = path.join(__dirname, '../uploads/', collection, model.img)

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  const name = await uploadArchive(req.files, undefined, collection)
  model.img = name
  await model.save()

  res.json(model)
}

const showImage = async (req = request, res = response) => {
  const { collection, id } = req.params
  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with the id ${id}`
        })
      }
      break
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with the id ${id}`
        })
      }
      break
    default:
      return res.status(500).json({
        msg: 'I forgot to validate this'
      })
  }

  if (model.img) {
    const imagePath = path.join(__dirname, '../uploads/', collection, model.img)
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath)
    }
  }

  const noImagePath = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(noImagePath)
}

const updateImageCloudinary = async (req = request, res = response) => {
  const { collection, id } = req.params
  let model

  switch (collection) {
    case 'users':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with the id ${id}`
        })
      }
      break
    case 'products':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with the id ${id}`
        })
      }
      break
    default:
      return res.status(500).json({
        msg: 'I forgot to validate this'
      })
  }

  // Clean previous images
  if (model.img) {
    const nameArr = model.img.split('/')
    const name = nameArr[nameArr.length - 1]
    const [publicId] = name.split('.')
    cloudinary.uploader.destroy(publicId)
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
  model.img = secure_url
  await model.save()

  res.json(model)
}

module.exports = {
  loadArchive,
  updateImage,
  showImage,
  updateImageCloudinary
}
