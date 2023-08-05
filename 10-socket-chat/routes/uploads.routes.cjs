const { Router } = require('express')
const { validateFields } = require('../middlewares/validate-fields.cjs')
const { loadArchive, showImage, updateImageCloudinary } = require('../controllers/upload.controller.cjs')
const { check } = require('express-validator')
const { collectionValids } = require('../helpers/db-validators.cjs')
const { archiveValidator } = require('../helpers/archive-validator.cjs')

const router = Router()

router.post('/', archiveValidator, loadArchive)

router.put('/:collection/:id', [
  archiveValidator,
  check('id', 'ID is not valid').isMongoId(),
  check('collection').custom(c => collectionValids(c, ['users', 'products'])),
  validateFields
], updateImageCloudinary)

router.get('/:collection/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('collection').custom(c => collectionValids(c, ['users', 'products'])),
  validateFields
], showImage)

module.exports = router
