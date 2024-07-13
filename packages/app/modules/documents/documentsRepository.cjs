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
  return await knex('documents').join('areas', 'documents.area_id', '=', 'areas.id').select('documents.*', 'areas.nombre as area')
    .then((data) => {
      return response(true, 'Documentos encontrados', data)
    })
    .catch((err) => {
      logger.error({ type: 'GET DOCUMENTS', message: 'Error al buscar documentos', error: err })
      return response(false, 'Error al buscar documentos', err)
    })
}

exports.deleteDocument = async function (id) {
  return await knex('documents').where('id', id).del()
    .then(() => {
      return response(true, 'Documento eliminado', id)
    })
    .catch((err) => {
      logger.error({ type: 'DELETE DOCUMENT', message: 'Error al eliminar documento', error: err })
      return response(false, 'Error al eliminar documento', err)
    })
}