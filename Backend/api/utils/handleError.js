const httpStatus = require('http-status').status;
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
  let rawCode = err.statusCode || err.code || httpStatus.INTERNAL_SERVER_ERROR;
  let code = Math.floor(Number(rawCode));
  
  if (!code || isNaN(code) || code < 100 || code > 599) {
    code = httpStatus.INTERNAL_SERVER_ERROR;
  }

  res.status(code).json(buildErrorObject(code, err.message || 'Internal Server Error'));
}

module.exports = { handleError }
