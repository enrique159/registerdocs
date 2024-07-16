const { ipcMain } = require('electron')
const { getActivities, createActivity, deleteActivity } = require('./activitiesRepository.cjs')

ipcMain.on('get_activities', async (event, id) => {
  const response = await getActivities(id)
  event.reply('get_activities', response)
})

ipcMain.on('create_activity', async (event, data) => {
  const response = await createActivity(data)
  event.reply('create_activity', response)
})

ipcMain.on('delete_activity', async (event, id) => {
  const response = await deleteActivity(id)
  event.reply('delete_activity', response)
})