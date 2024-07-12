const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response, logger } = require('../../helpers/index.cjs')

exports.signIn = async function (data) {
  const user = await knex('users').select().where('username', data.username).first()
  if (!user) {
    logger.error({ type: 'SIGN IN', message: 'Usuario no encontrado', data })
    return response(false, 'Usuario no encontrado', data)
  }
  if (user.password !== data.password) {
    logger.error({ type: 'SIGN IN', message: 'Contraseña incorrecta', data })
    return response(false, 'Contraseña incorrecta', data)
  }
  logger.info({ type: 'SESSION STARTED' })
  return response(true, 'Usuario encontrado', { id: user.id, username: user.username })
}