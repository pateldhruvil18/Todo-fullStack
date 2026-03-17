const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const secretKey = process.env.ENCRYPTION_KEY || 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3' // Must be 32 chars
const iv = crypto.randomBytes(16)

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

module.exports = { encrypt }
