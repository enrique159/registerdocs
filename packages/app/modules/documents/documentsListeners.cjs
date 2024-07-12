const { ipcRenderer } = require('electron')

exports.createDocument = function (params, callback) {
  ipcRenderer.removeAllListeners('create_document')
  ipcRenderer.on('create_document', (_, response) => callback(response))
  ipcRenderer.send('create_document', params)
}

exports.getDocuments = function (callback) {
  ipcRenderer.removeAllListeners('get_documents')
  ipcRenderer.on('get_documents', (_, response) => callback(response))
  ipcRenderer.send('get_documents')
}