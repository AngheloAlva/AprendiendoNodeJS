const { Router } = require('express')
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validateJWT.cjs')
const { validateFields } = require('../middlewares/validate-fields.cjs')
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller.cjs')
const { isProductByIdExist, isCategoryByIdExist } = require('../helpers/db-validators.cjs')
const { isAdminRole } = require('../middlewares/validate-role.cjs')

const router = Router()

router.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('category', 'Category is not valid').isMongoId(),
  check('category').custom(isCategoryByIdExist),
  validateFields
], createProduct)

router.get('/', getProducts)

router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(isProductByIdExist),
  validateFields
], getProductById)

router.put('/:id', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(isProductByIdExist),
  validateFields
], updateProduct)

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(isProductByIdExist),
  validateFields
], deleteProduct)

module.exports = router
