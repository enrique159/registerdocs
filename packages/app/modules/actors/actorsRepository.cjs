const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response } = require('../../helpers/index.cjs')

exports.getActors = async function () {
  return await knex('actors').select()
    .then((actors) => {
      return response(true, 'Actores encontradas', actors)
    })
    .catch((err) => {
      return response(false, 'Error al buscar actores', err)
    })
}