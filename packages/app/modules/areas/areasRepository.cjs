const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response } = require('../../helpers/index.cjs')

exports.getAreas = async function () {
  return await knex('areas').select()
    .then((areas) => {
      return response(true, 'Áreas encontradas', areas)
    })
    .catch((err) => {
      return response(false, 'Error al buscar áreas', err)
    })
}

exports.createArea = async function (area) {
  return await knex('areas').insert(area)
    .then(() => {
      return response(true, 'Área creada')
    })
    .catch((err) => {
      return response(false, 'Error al crear área', err)
    })
}

exports.updateArea = async function (area) {
  return await knex('areas').where('id', area.id).update(area)
    .then(() => {
      return response(true, 'Área actualizada')
    })
    .catch((err) => {
      return response(false, 'Error al actualizar área', err)
    })
}

exports.deleteArea = async function (id) {
  return await knex('areas').where('id', id).del()
    .then(() => {
      return response(true, 'Área eliminada')
    })
    .catch((err) => {
      return response(false, 'Error al eliminar área', err)
    })
}