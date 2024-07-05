/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.createTable = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
  }).then(() => {
    console.log("Table 'users' created.")
  }).catch((err) => {
    console.error(err)
  })
}