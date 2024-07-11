const logger = require('./logger.cjs')

exports.response = function (success, message, response) {
  return { success, message, response }
}

exports.logger = logger