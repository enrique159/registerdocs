/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 0, username: 'admin', password: '1234'},
  ])
  await knex('areas').del()
  await knex('areas').insert([
    {id: 0, nombre: 'Department A'},
    {id: 1, nombre: 'Department B'},
  ])
  await knex('actors').del()
  await knex('actors').insert([
    {nombre: 'Lic. Jose Antonio'},
    {nombre: 'Ing. Juan Carlos'},
  ])
}
