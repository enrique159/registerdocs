const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')

exports.createDocument = async function (data) {
  return await knex('documents').insert(data)
    .then(() => {
      return response(true, 'Documento creado', data)
    })
    .catch((err) => {
      logger.error({ type: 'CREATE DOCUMENT DB', message: 'Error al crear documento', error: err })
      return response(false, 'Error al crear documento', err)
    })
}

exports.getDocuments = async function () {
  return await knex('documents').select()
    .then((data) => {
      return response(true, 'Documentos encontrados', data)
    })
    .catch((err) => {
      logger.error({ type: 'GET DOCUMENTS', message: 'Error al buscar documentos', error: err })
      return response(false, 'Error al buscar documentos', err)
    })
}