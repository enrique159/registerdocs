const { ipcRenderer } = require('electron')

exports.getActors = function (callback) {
  ipcRenderer.removeAllListeners('get_actors')
  ipcRenderer.on('get_actors', (_, response) => callback(response))
  ipcRenderer.send('get_actors')
}

exports.getActorByNombre = function (nombre, callback) {
  ipcRenderer.removeAllListeners('get_actor_by_nombre')
  ipcRenderer.on('get_actor_by_nombre', (_, response) => callback(response))
  ipcRenderer.send('get_actor_by_nombre', nombre)
}

exports.createActor = function (actor, callback) {
  ipcRenderer.removeAllListeners('create_actor')
  ipcRenderer.on('create_actor', (_, response) => callback(response))
  ipcRenderer.send('create_actor', actor)
}

exports.deleteActor = function (nombre, callback) {
  ipcRenderer.removeAllListeners('delete_actor')
  ipcRenderer.on('delete_actor', (_, response) => callback(response))
  ipcRenderer.send('delete_actor', nombre)
}