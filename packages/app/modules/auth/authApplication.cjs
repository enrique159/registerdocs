const { ipcMain } = require('electron')
const { signIn, signUp, changePassword } = require('./authRepository.cjs')

ipcMain.on('sign_in', async (event, data) => {
  const response = await signIn(data)
  event.reply('sign_in', response)
})

ipcMain.on('sign_up', async (event, data) => {
  const response = await signUp(data)
  event.reply('sign_up', response)
})

ipcMain.on('change_password', async (event, data) => {
  const response = await changePassword(data)
  event.reply('change_password', response)
})