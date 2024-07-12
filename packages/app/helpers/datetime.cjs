const moment = require('moment-timezone')

exports.getDatetime = function () {
  return moment().tz('America/Mazatlan').format('YYYY-MM-DD HH:mm:ss')
}
