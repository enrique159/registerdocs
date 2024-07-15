const { ipcRenderer } = require('electron')

exports.signIn = function (params, callback) {
  ipcRenderer.removeAllListeners('sign_in')
  ipcRenderer.on('sign_in', (_, response) => callback(response))
  ipcRenderer.send('sign_in', params)
}

exports.signUp = function (params, callback) {
  ipcRenderer.removeAllListeners('sign_up')
  ipcRenderer.on('sign_up', (_, response) => callback(response))
  ipcRenderer.send('sign_up', params)
}

exports.changePassword = function (params, callback) {
  ipcRenderer.removeAllListeners('change_password')
  ipcRenderer.on('change_password', (_, response) => callback(response))
  ipcRenderer.send('change_password', params)
}