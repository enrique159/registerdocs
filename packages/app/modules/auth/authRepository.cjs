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

exports.signUp = async function (data) {
  const user = await knex('users').select().where('username', data.username).first()
  if (user) {
    logger.error({ type: 'SIGN UP', message: 'Usuario ya existe', data })
    return response(false, 'Usuario ya existe', data)
  }
  return await knex('users').insert(data).returning('*')
    .then((user) => {
      logger.info({ type: 'USER CREATED', message: 'Usuario creado', user: data.username })
      return response(true, 'Usuario creado', user[0])
    })
    .catch((err) => {
      logger.error({ type: 'SIGN UP', message: 'Error al crear usuario', data, err })
      return response(false, 'Error al crear usuario', err)
    })
}

exports.changePassword = async function (data) {
  const user = await knex('users').select().where('id', data.id).first()
  if (!user) {
    logger.error({ type: 'CHANGE PASSWORD', message: 'Usuario no encontrado', data })
    return response(false, 'Usuario no encontrado', data)
  }
  if (user.password !== data.oldPassword) {
    logger.error({ type: 'CHANGE PASSWORD', message: 'Contraseña incorrecta', data })
    return response(false, 'Contraseña incorrecta', data)
  }
  return await knex('users').update({ password: data.newPassword }).where('id', data.id).returning('*')
    .then((user) => {
      logger.info({ type: 'PASSWORD CHANGED', message: 'Contraseña cambiada', user: user[0] })
      return response(true, 'Se ha cambiado la contraseña exitosamente', user[0])
    })
    .catch((err) => {
      logger.error({ type: 'CHANGE PASSWORD', message: 'Error al cambiar contraseña', data, err })
      return response(false, 'Hubo un error al cambiar contraseña', err)
    })
}