const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')

exports.getActors = async function () {
  return await knex('actors').select()
    .then((actors) => {
      return response(true, 'Actores encontradas', actors)
    })
    .catch((err) => {
      logger.error({ type: 'GET ACTORS', message: 'Error al buscar actores', error: err })
      return response(false, 'Error al buscar actores', err)
    })
}

exports.getActorByNombre = async function (nombre) {
  return await knex('actors').where('nombre', nombre).select()
    .then((actor) => {
      return response(true, 'Actor encontrado', actor)
    })
    .catch((err) => {
      logger.error({ type: 'GET ACTOR BY NOMBRE', message: 'Error al buscar actor', error: err })
      return response(false, 'Error al buscar actor', err)
    })
}

exports.createActor = async function (actor) {
  return await knex('actors').insert(actor)
    .then(() => {
      return response(true, 'Actor creado', actor)
    })
    .catch((err) => {
      logger.error({ type: 'CREATE ACTOR', message: 'Error al crear actor', error: err })
      return response(false, 'Error al crear actor', err)
    })
}

exports.deleteActor = async function (nombre) {
  return await knex('actors').where('nombre', nombre).del()
    .then(() => {
      return response(true, 'Actor eliminado')
    })
    .catch((err) => {
      logger.error({ type: 'DELETE ACTOR', message: 'Error al eliminar actor', error: err })
      return response(false, 'Error al eliminar actor', err)
    })
}