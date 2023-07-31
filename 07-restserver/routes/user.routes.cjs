const { Router } = require('express')
const { check } = require('express-validator')
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user.controller.cjs')
const { isRoleValid, isEmailExist, isUserByIdExist } = require('../helpers/db-validators.cjs')
const { validateJWT } = require('../middlewares/validateJWT.cjs')
const { hasRole } = require('../middlewares/validate-role.cjs')
const { validateFields } = require('../middlewares/validate-fields.cjs')
// const { isAdminRole } = require('../middlewares/validate-role.cjs')

const router = Router()

router.get('/', userGet)

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(isEmailExist),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isRoleValid),
  validateFields
], userPost)

router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id', 'ID does not exist').custom(isUserByIdExist),
  check('role').custom(isRoleValid),
  validateFields
], userPut)

router.patch('/', userPatch)

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id', 'ID does not exist').custom(isUserByIdExist),
  validateFields
], userDelete)

module.exports = router
