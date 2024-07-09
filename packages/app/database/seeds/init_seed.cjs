const { v4: uuidv4 } = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Configuration
  await knex('configuration').del()
  await knex('configuration').insert({ inicializado: false, ruta_recursos: null })
  // Users
  await knex('users').del()
  await knex('users').insert([
    {id: uuidv4(), username: 'admin', password: '1234'},
  ])
  // Areas
  await knex('areas').del()
  await knex('areas').insert([
    {id: uuidv4(), nombre: 'Department A'},
    {id: uuidv4(), nombre: 'Department B'},
  ])
  // Actors
  await knex('actors').del()
  await knex('actors').insert([
    {nombre: 'Lic. Jose Antonio'},
    {nombre: 'Ing. Juan Carlos'},
  ])
}
