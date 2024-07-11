const { ipcRenderer } = require('electron')

exports.getConfiguration = function (callback) {
  ipcRenderer.removeAllListeners('get_configuration')
  ipcRenderer.on('get_configuration', (_, response) => callback(response))
  ipcRenderer.send('get_configuration')
}

exports.updateConfiguration = function (data, callback) {
  ipcRenderer.removeAllListeners('update_configuration')
  ipcRenderer.on('update_configuration', (_, response) => callback(response))
  ipcRenderer.send('update_configuration', data)
}