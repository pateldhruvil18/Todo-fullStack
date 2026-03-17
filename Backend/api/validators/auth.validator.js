const { check } = require('express-validator')
const { validateRequest } = require('../utils/validateRequest')

/**
 * Validates register request
 */
const validateRegister = [
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('TOO_SHORT_MIN_5'),
  (req, res, next) => {
    validateRequest(req, res, next)
  }
]

/**
 * Validates login request
 */
const validateLogin = [
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('TOO_SHORT_MIN_5'),
  (req, res, next) => {
    validateRequest(req, res, next)
  }
]

module.exports = {
  validateRegister,
  validateLogin
}
