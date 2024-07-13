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

exports.openDocument = function (params, callback) {
  ipcRenderer.removeAllListeners('open_document')
  ipcRenderer.on('open_document', (_, response) => callback(response))
  ipcRenderer.send('open_document', params)
}

exports.deleteDocument = function (id, callback) {
  ipcRenderer.removeAllListeners('delete_document')
  ipcRenderer.on('delete_document', (_, response) => callback(response))
  ipcRenderer.send('delete_document', id)
}