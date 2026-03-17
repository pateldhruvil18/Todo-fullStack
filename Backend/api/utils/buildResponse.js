/**
 * Builds success response object
 * @param {string} message - success message
 * @param {Object} data - data to be sent
 */
const buildResponse = (message = 'Success', data = {}) => {
  return {
    message,
    data
  }
}

module.exports = { buildResponse }
