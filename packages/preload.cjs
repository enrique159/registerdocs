const { contextBridge, ipcRenderer } = require('electron')
const { signIn } = require('./app/modules/auth/authApplication.cjs')
const { getAreas, createArea, updateArea, deleteArea } = require('./app/modules/areas/areasApplication.cjs')
const { getActors } = require('./app/modules/actors/actorsApplication.cjs')

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
  // Auth
  signIn,
  // Areas
  getAreas,
  createArea,
  updateArea,
  deleteArea,
  // Actors
  getActors,
  // Extras
  closeApp: () => ipcRenderer.send('close_app'),
})