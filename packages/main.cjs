const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const AsyncMessage = require('./app/Example.cjs')
const env = require('../env.json')

const dev = env.NODE_ENV === 'development'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 940,
    minHeight: 620,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('async-message', (event, params) => {
  console.log(params)
  const response = AsyncMessage(params)
  event.reply('async-message', response)
})