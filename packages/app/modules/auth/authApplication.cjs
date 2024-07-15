const { ipcMain } = require('electron')
const { signIn, signUp } = require('./authRepository.cjs')

ipcMain.on('sign_in', async (event, data) => {
  const response = await signIn(data)
  event.reply('sign_in', response)
})

ipcMain.on('sign_up', async (event, data) => {
  const response = await signUp(data)
  event.reply('sign_up', response)
})