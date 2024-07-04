const { contextBridge, ipcRenderer } = require('electron')
const { signIn } = require('./app/modules/auth/authApplication.cjs')

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
  signIn,
  closeApp: () => ipcRenderer.send('close_app'),
})