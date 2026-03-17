const httpStatus = require('http-status')
const { buildErrorObject } = require('./buildErrorObject')

/**
 * Handles error responses
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Print error in console
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // Send error response
  const code = err.code || httpStatus.INTERNAL_SERVER_ERROR
  res.status(code).json(buildErrorObject(code, err.message || 'Internal Server Error'))
}

module.exports = { handleError }
