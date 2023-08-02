const { Router } = require('express')
// const { check } = require('express-validator')
// const { validateFields } = require('../middlewares/validate-fields.cjs')
const { loadArchive } = require('../controllers/upload.controller.cjs')

const router = Router()

router.post('/', loadArchive)

module.exports = router
