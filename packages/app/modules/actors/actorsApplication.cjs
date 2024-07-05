const { ipcRenderer } = require('electron')

exports.getActors = function (callback) {
  ipcRenderer.removeAllListeners('get_actors')
  ipcRenderer.on('get_actors', (_, response) => callback(response))
  ipcRenderer.send('get_actors')
}