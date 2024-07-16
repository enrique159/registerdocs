const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')
const { mapToActor } = require('./actorsMappers.cjs')

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
  return await knex('actors').where('nombre', nombre).select().first()
    .then((actor) => {
      if (!actor) return response(false, 'Actor no encontrado', nombre)
      return response(true, 'Actor encontrado', actors)
    })
    .catch((err) => {
      logger.error({ type: 'GET ACTOR BY NOMBRE', message: 'Error al buscar actor', error: err })
      return response(false, 'Error al buscar actor', err)
    })
}

exports.createActor = async function (actor) {
  return await knex('actors').insert(actor).returning('*')
    .then((actors) => {
      return response(true, 'Actor creado', actors)
    })
    .catch((err) => {
      logger.error({ type: 'CREATE ACTOR', message: 'Error al crear actor', error: err })
      return response(false, 'Error al crear actor, ya se encuentra registrado', err)
    })
}

exports.deleteActor = async function (actor) {
  return await knex('actors').where('nombre', actor.nombre).del()
    .then(() => {
      return response(true, 'Actor eliminado')
    })
    .catch((err) => {
      logger.error({ type: 'DELETE ACTOR', message: 'Error al eliminar actor', error: err })
      return response(false, 'Error al eliminar actor', err)
    })
}

exports.importActors = async function (actors) {
  if (!actors || actors.length === 0) {
    return response(true, 'No hay actores para importar', [])
  }
  const mappedActors = actors.map(mapToActor)
  await knex('actors').del()
  return await knex('actors').insert(mappedActors).returning('*')
    .then((data) => {
      return response(true, 'Actores importados', data)
    })
    .catch((err) => {
      logger.error({ type: 'IMPORT ACTORS', message: 'Error al importar actores', error: err })
      return response(false, 'Error al importar actores', err)
    })
}