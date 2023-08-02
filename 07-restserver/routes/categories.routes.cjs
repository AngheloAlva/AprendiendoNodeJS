const { Router } = require('express')
const { getCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller.cjs')
const { validateJWT } = require('../middlewares/validateJWT.cjs')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields.cjs')
const { isCategoryByIdExist } = require('../helpers/db-validators.cjs')
const { isAdminRole } = require('../middlewares/validate-role.cjs')

const router = Router()

router.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  validateFields
], createCategory)

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(isCategoryByIdExist),
  validateFields
], getCategory)

router.put('/:id', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('id').custom(isCategoryByIdExist),
  validateFields
], updateCategory)

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(isCategoryByIdExist),
  validateFields
], deleteCategory)

module.exports = router
