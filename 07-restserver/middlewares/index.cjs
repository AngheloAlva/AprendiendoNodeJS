const { hasRole } = require('./validate-role.cjs')
const { validateJWT } = require('./validateJWT.cjs')
const { validateFields } = require('./validate-fields.cjs')

module.exports = {
  ...validateJWT,
  ...hasRole,
  ...validateFields
}
