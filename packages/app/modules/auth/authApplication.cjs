const { ipcRenderer } = require('electron')

exports.signIn = function (params, callback) {
  ipcRenderer.removeAllListeners('sign_in')
  ipcRenderer.on('sign_in', (_, response) => callback(response))
  ipcRenderer.send('sign_in', params)
}