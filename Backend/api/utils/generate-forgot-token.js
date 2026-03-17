const crypto = require('crypto')

/**
 * Generates a random token for forgot password
 */
const generateForgotToken = () => {
  return crypto.randomBytes(20).toString('hex')
}

module.exports = { generateForgotToken }
