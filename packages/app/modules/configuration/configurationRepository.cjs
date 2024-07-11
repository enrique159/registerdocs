const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')

exports.getConfiguration = async function () {
  return await knex('configuration').select().first()
    .then((configuration) => {
      return response(true, 'Configuración encontrada', configuration)
    })
    .catch((err) => {
      logger.error({ type: 'GET CONFIGURATION ERROR', message: err })
      return response(false, 'Error al traer la configuración', err)
    })
}

exports.updateConfiguration = async function (data) {
  return await knex('configuration').update(data).returning('*')
    .then((response) => {
      return response(true, 'Configuración actualizada', response[0])
    })
    .catch((err) => {
      return response(false, 'Error al actualizar la configuración', err)
    })
}