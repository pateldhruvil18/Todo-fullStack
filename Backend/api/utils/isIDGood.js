const httpStatus = require('http-status')
const { buildErrorObject } = require('./buildErrorObject')

/**
 * Checks if value is a valid mongodb id
 * @param {string} id - id to check
 */
const isIDGood = async (id = '') => {
  return new Promise((resolve, reject) => {
    const mongoose = require('mongoose')
    const goodID = mongoose.Types.ObjectId.isValid(id)
    return goodID ? resolve(id) : reject(buildErrorObject(httpStatus.UNPROCESSABLE_ENTITY, 'ID_MALFORMED'))
  })
}

module.exports = { isIDGood }
