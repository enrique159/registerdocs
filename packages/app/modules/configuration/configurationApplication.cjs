const { ipcMain } = require('electron')
const { getConfiguration, updateConfiguration } = require('./configurationRepository.cjs')

ipcMain.on('get_configuration', async (event) => {
  const response = await getConfiguration()
  event.reply('get_configuration', response)
})

ipcMain.on('update_configuration', async (event, data) => {
  const response = await updateConfiguration(data)
  event.reply('update_configuration', response)
})
