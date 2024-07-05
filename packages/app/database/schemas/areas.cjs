/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.createTable = async function(knex) {
  await knex.schema.createTable('areas', (table) => {
    table.increments('id').primary()
    table.string('nombre')
  }).then(() => {
    console.log("Table 'areas' created.")
  }).catch((err) => {
    console.error(err)
  })
}