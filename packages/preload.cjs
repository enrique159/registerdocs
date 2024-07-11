const { contextBridge, ipcRenderer } = require('electron')
const { signIn } = require('./app/modules/auth/authListeners.cjs')
const { getAreas, createArea, updateArea, deleteArea } = require('./app/modules/areas/areasListeners.cjs')
const { getActors, getActorByNombre, createActor, deleteActor } = require('./app/modules/actors/actorsListeners.cjs')
const { createDocument } = require('./app/modules/documents/documentsListeners.cjs')
const { getConfiguration, updateConfiguration } = require('./app/modules/configuration/configurationListeners.cjs')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('electron', {
  // Configuration
  getConfiguration,
  updateConfiguration,
  // Auth
  signIn,
  // Areas
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  // Actors
  getActors,
  getActorByNombre,
  createActor,
  deleteActor,
  // Documents
  createDocument,
  // Extras
  closeApp: () => ipcRenderer.send('close_app'),
})