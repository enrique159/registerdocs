const { ipcMain } = require('electron')
const { getActors, getActorByNombre, createActor, deleteActor } = require('./actorsRepository.cjs')

ipcMain.on('get_actors', async (event) => {
  const response = await getActors()
  event.reply('get_actors', response)
})

ipcMain.on('get_actor_by_nombre', async (event, nombre) => {
  const response = await getActorByNombre(nombre)
  event.reply('get_actor_by_nombre', response)
})

ipcMain.on('create_actor', async (event, actor) => {
  const response = await createActor(actor)
  event.reply('create_actor', response)
})

ipcMain.on('delete_actor', async (event, nombre) => {
  const response = await deleteActor(nombre)
  event.reply('delete_actor', response)
})