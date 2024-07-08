const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response } = require('../../helpers/index.cjs')

exports.createDocument = async function (data) {
  return await knex('documents').insert(data)
    .then(() => {
      return response(true, 'Documento creado', data)
    })
    .catch((err) => {
      return response(false, 'Error al crear documento', err)
    })
}