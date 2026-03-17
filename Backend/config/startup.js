const logger = require('./logger')

/**
 * Actions to be performed on startup
 */
const startup = () => {
  logger.info(`App started in ${process.env.NODE_ENV || 'development'} mode`)
  logger.info(`Server running on port ${process.env.PORT || 5000}`)
}

module.exports = startup
