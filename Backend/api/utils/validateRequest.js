const { validationResult } = require('express-validator')
const httpStatus = require('http-status').status;
const { buildErrorObject } = require('./buildErrorObject')

/**
 * Sends error results from validation in response
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next object
 */
const validateRequest = (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(buildErrorObject(httpStatus.UNPROCESSABLE_ENTITY, errors.array()))
    }
    return next()
  } catch (error) {
    return next(buildErrorObject(httpStatus.UNPROCESSABLE_ENTITY, error.message))
  }
}

module.exports = { validateRequest }
