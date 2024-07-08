const knex = require('knex')(require('../../database/knexfile.cjs'))
const { response } = require('../../helpers/index.cjs')

exports.signIn = async function (data) {
  const user = await knex('users').select().where('username', data.username).first()
  if (!user) {
    return response(false, 'Usuario no encontrado', data)
  }
  if (user.password !== data.password) {
    return response(false, 'Contraseña incorrecta', data)
  }
  return response(true, 'Usuario encontrado', { id: user.id, username: user.username })
}