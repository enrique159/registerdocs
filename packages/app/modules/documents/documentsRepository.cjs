const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')
const { mapToDocument } = require('./documentsMappers.cjs')

exports.createDocument = async function (data) {
  return await knex('documents').insert(data).returning('*')
    .then((documents) => {
      return response(true, 'Documento creado', documents)
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


exports.importDocuments = async function (documents) {
  if (!documents || documents.length === 0) {
    return response(true, 'No hay documentos para importar', [])
  }
  const mappedDocuments = documents.map(mapToDocument)
  await knex('documents').del()
  return await knex('documents').insert(mappedDocuments).returning('*')
    .then((data) => {
      return response(true, 'Documentos importados', data)
    })
    .catch((err) => {
      console.log(err)
      logger.error({ type: 'IMPORT DOCUMENTS', message: 'Error al importar documentos', error: err })
      return response(false, 'Error al importar documentos', err)
    })
}