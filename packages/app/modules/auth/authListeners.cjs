const { ipcMain } = require('electron')
const { signIn } = require('./authRepository.cjs')

ipcMain.on('sign_in', async (event, data) => {
  const response = await signIn(data)
  event.reply('sign_in', response)
})