const fs = require("fs")

const FILES_LOGS_BY_TYPE = {
  info: "info.log",
  error: "error.log",
  warning: "warning.log",
}

async function writeLog(message, type) {
  if (typeof message === "object") {
    message = JSON.stringify(message)
  }

  const path = getLogPath(type)

  message = `${new Date().toISOString()} | ${message} \n`
  fs.appendFile(
    path,
    message,
    { encoding: "utf8", mode: 0o666, flag: "a" },
    handleResultLogger
  )
}

function handleResultLogger(error) {
  // eslint-disable-next-line no-console
  if (error) console.log(error)
}

function getLogPath(type) {
  const path = "logs"
  const file = FILES_LOGS_BY_TYPE[type] || FILES_LOGS_BY_TYPE.error
  if (!fs.existsSync(path)) fs.mkdirSync(path)

  return `${path}/${file}`
}

async function error(message) {
  return writeLog(message, "error")
}

async function info(message) {
  return writeLog(message, "info")
}

async function warning(message) {
  return writeLog(message, "warning")
}


module.exports = {
  log: writeLog,
  error,
  warning,
  info,
}
