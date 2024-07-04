const { app, BrowserWindow } = require('electron')
const path = require('path')
const env = require('../env.json')
const initDB = require('./app/database/index.cjs')
const dev = env.NODE_ENV === 'development'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 940,
    minHeight: 620,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
    },
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    dev
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  )
  // Open the DevTools.
  if (dev) {
    mainWindow.webContents.openDevTools()
  }
}


if (dev) {
  console.log('[electron]: Development mode')
  app.whenReady()
    .then(() => require('electron-devtools-installer'))
    .then(async({default: installExtension}) => {
      installExtension({
        id: 'ljjemllljcmogpfapbkkighbhhppjdbg',
        electron: '>=1.2.1',
      })
        .then((name) => console.log(`[electron]: Added Extension: ${name}`))
        .catch((err) => console.log('[electron]: An error occurred: ', err))
    })
    .catch((e) => console.error('[electron] Failed install extension:', e))
}

app.whenReady().then(() => {
  initDB().then(() => {
    createWindow()
  })

  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


require('./app/modules/auth/authListeners.cjs')