const { contextBridge, ipcRenderer } = require('electron')

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
  asyncMessage: (params, callback ) => {
    ipcRenderer.removeAllListeners('async-message')
    ipcRenderer.on('async-message', callback)
    ipcRenderer.send('async-message', params)
  },
})