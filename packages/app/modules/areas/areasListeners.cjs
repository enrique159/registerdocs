const { ipcMain } = require('electron')
const { getAreas, createArea, updateArea, deleteArea } = require('./areasRepository.cjs')

ipcMain.on('get_areas', async (event) => {
  const response = await getAreas()
  event.reply('get_areas', response)
})

ipcMain.on('create_area', async (event, area) => {
  const response = await createArea(area)
  event.reply('create_area', response)
})

ipcMain.on('update_area', async (event, area) => {
  const response = await updateArea(area)
  event.reply('update_area', response)
})

ipcMain.on('delete_area', async (event, id) => {
  const response = await deleteArea(id)
  event.reply('delete_area', response)
})
