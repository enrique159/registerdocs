const { ipcMain } = require('electron')
const { getConfiguration, updateConfiguration, createConfiguration } = require('./configurationRepository.cjs')
const path = require('path')
const os = require('os')

ipcMain.on('get_configuration', async (event) => {
  const response = await getConfiguration()
  event.reply('get_configuration', response)
})

ipcMain.on('update_configuration', async (event, data) => {
  const response = await updateConfiguration(data)
  event.reply('update_configuration', response)
})

ipcMain.on('create_configuration', async (event, data) => {
  data.ruta_recursos = path.join(os.homedir(), data.ruta_recursos ?? 'resources')
  const response = await createConfiguration(data)
  event.reply('create_configuration', response)
})
