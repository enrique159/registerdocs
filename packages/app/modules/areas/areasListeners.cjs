const { ipcRenderer } = require('electron')

exports.getAreas = function (callback) {
  ipcRenderer.removeAllListeners('get_areas')
  ipcRenderer.on('get_areas', (_, response) => callback(response))
  ipcRenderer.send('get_areas')
}

exports.createArea = function (area, callback) {
  ipcRenderer.removeAllListeners('create_area')
  ipcRenderer.on('create_area', (_, response) => callback(response))
  ipcRenderer.send('create_area', area)
}

exports.updateArea = function (area, callback) {
  ipcRenderer.removeAllListeners('update_area')
  ipcRenderer.on('update_area', (_, response) => callback(response))
  ipcRenderer.send('update_area', area)
}

exports.deleteArea = function (id, callback) {
  ipcRenderer.removeAllListeners('delete_area')
  ipcRenderer.on('delete_area', (_, response) => callback(response))
  ipcRenderer.send('delete_area', id)
}