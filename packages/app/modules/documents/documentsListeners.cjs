const { ipcRenderer } = require('electron')

exports.createDocument = function (params, callback) {
  ipcRenderer.removeAllListeners('create_document')
  ipcRenderer.on('create_document', (_, response) => callback(response))
  ipcRenderer.send('create_document', params)
}