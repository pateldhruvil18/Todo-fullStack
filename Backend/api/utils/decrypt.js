const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const secretKey = process.env.ENCRYPTION_KEY || 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3' // Must be 32 chars

/**
 * Decrypts text
 * @param {string} text - text to decrypt
 */
const decrypt = (text) => {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

module.exports = { decrypt }
