const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')

exports.getAreas = async function () {
  return await knex('areas').select()
    .then((areas) => {
      return response(true, 'Áreas encontradas', areas)
    })
    .catch((err) => {
      logger.error({ type: 'GET AREAS', message: 'Error al buscar áreas', error: err })
      return response(false, 'Error al buscar áreas', err)
    })
}

exports.createArea = async function (area) {
  const areaExists = await knex('areas').where('nombre', area.nombre).select()
  if (areaExists.length > 0) {
    logger.warning({ type: 'CREATE AREA', message: 'El nombre del área ya existe', area: areaExists })
    return response(false, 'El nombre del área ya existe', areaExists)
  }
  return await knex('areas').insert(area).returning('*')
    .then((newArea) => {
      return response(true, 'Área creada', newArea[0])
    })
    .catch((err) => {
      logger.error({ type: 'CREATE AREA', message: 'Error al crear área', error: err })
      return response(false, 'Error al crear área', err)
    })
}

exports.updateArea = async function (area) {
  return await knex('areas').where('id', area.id).update(area)
    .then(() => {
      return response(true, 'Área actualizada')
    })
    .catch((err) => {
      logger.error({ type: 'UPDATE AREA', message: 'Error al actualizar área', error: err })
      return response(false, 'Error al actualizar área', err)
    })
}

exports.deleteArea = async function (id) {
  return await knex('areas').where('id', id).del()
    .then(() => {
      return response(true, 'Área eliminada')
    })
    .catch((err) => {
      logger.error({ type: 'DELETE AREA', message: 'Error al eliminar área', error: err })  
      return response(false, 'Error al eliminar área', err)
    })
}