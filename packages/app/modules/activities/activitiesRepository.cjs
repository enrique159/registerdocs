const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')
const { mapToActivity } = require('./activitiesMappers.cjs')

exports.getActivities = async function (documentId) {
  return await knex('activities').select().where('document_id', documentId)
    .then((activities) => {
      return response(true, 'Actividades encontradas', activities)
    })
    .catch((err) => {
      logger.error({ type: 'GET ACTIVITIES ERROR', message: err })
      return response(false, 'Error al traer las actividades', err)
    })
}

exports.createActivity = async function (data) {
  return await knex('activities').insert(data).returning('*')
    .then((activities) => {
      return response(true, 'Actividad creada', activities)
    })
    .catch((err) => {
      logger.error({ type: 'CREATE ACTIVITY ERROR', message: err })
      return response(false, 'Error al crear la actividad', err)
    })
}

exports.deleteActivity = async function (id) {
  return await knex('activities').where('id', id).del()
    .then(() => {
      return response(true, 'Actividad eliminada')
    })
    .catch((err) => {
      logger.error({ type: 'DELETE ACTIVITY ERROR', message: err })
      return response(false, 'Error al eliminar la actividad', err)
    })
}

exports.getAllActivities = async function () {
  return await knex('activities').select()
    .then((activities) => {
      return response(true, 'Actividades encontradas', activities)
    })
    .catch((err) => {
      logger.error({ type: 'GET ALL ACTIVITIES ERROR', message: err })
      return response(false, 'Error al traer las actividades', err)
    })
}

exports.importActivities = async function (activities) {
  if (!activities || activities.length === 0) {
    return response(true, 'No hay actividades para importar', [])
  }
  const mappedActivities = activities.map(mapToActivity)
  await knex('activities').del()
  return await knex('activities').insert(mappedActivities).returning('*')
    .then((data) => {
      return response(true, 'Actividades importadas', data)
    })
    .catch((err) => {
      logger.error({ type: 'IMPORT ACTIVITIES ERROR', message: err })
      return response(false, 'Error al importar las actividades', err)
    })
}
