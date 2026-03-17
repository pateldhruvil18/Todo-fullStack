const { check } = require('express-validator')
const { validateRequest } = require('../utils/validateRequest')

/**
 * Validates upload request
 */
const validateUpload = [
  // Example validation if needed
  (req, res, next) => {
    validateRequest(req, res, next)
  }
]

module.exports = {
  validateUpload
}
