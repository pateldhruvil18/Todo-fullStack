const httpStatus = require('http-status').status;

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error message
 */
const buildErrorObject = (code = httpStatus.INTERNAL_SERVER_ERROR, message = 'Internal Server Error') => {
  return {
    code,
    message
  }
}

module.exports = { buildErrorObject }
