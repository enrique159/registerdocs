const { ipcMain } = require('electron')
const { getActors } = require('./actorsRepository.cjs')

ipcMain.on('get_actors', async (event) => {
  const response = await getActors()
  event.reply('get_actors', response)
})