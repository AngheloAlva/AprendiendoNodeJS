const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSingIn } = require('../controllers/auth.contoller.cjs')
const { validateFields } = require('../middlewares/validate-fields.cjs')

const router = Router()

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
], login)

router.post('/google', [
  check('id_token', 'id_token is required').not().isEmpty(),
  validateFields
], googleSingIn)

module.exports = router
