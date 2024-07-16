const { ipcRenderer } = require('electron')

exports.getActivities = function (callback) {
  ipcRenderer.removeAllListeners('get_activities')
  ipcRenderer.on('get_activities', (_, response) => callback(response))
  ipcRenderer.send('get_activities')
}

exports.createActivity = function (data, callback) {
  ipcRenderer.removeAllListeners('create_activity')
  ipcRenderer.on('create_activity', (_, response) => callback(response))
  ipcRenderer.send('create_activity', data)
}

exports.deleteActivity = function (id, callback) {
  ipcRenderer.removeAllListeners('delete_activity')
  ipcRenderer.on('delete_activity', (_, response) => callback(response))
  ipcRenderer.send('delete_activity', id)
}
