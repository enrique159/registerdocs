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

exports.getActorByNombre = async function (nombre) {
  return await knex('actors').where('nombre', nombre).select()
    .then((actor) => {
      return response(true, 'Actor encontrado', actor)
    })
    .catch((err) => {
      return response(false, 'Error al buscar actor', err)
    })
}

exports.createActor = async function (actor) {
  return await knex('actors').insert(actor)
    .then(() => {
      return response(true, 'Actor creado', actor)
    })
    .catch((err) => {
      return response(false, 'Error al crear actor', err)
    })
}

exports.deleteActor = async function (nombre) {
  return await knex('actors').where('nombre', nombre).del()
    .then(() => {
      return response(true, 'Actor eliminado')
    })
    .catch((err) => {
      return response(false, 'Error al eliminar actor', err)
    })
}