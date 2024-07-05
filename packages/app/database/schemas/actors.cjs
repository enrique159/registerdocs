/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.createTable = async function(knex) {
  await knex.schema.createTable('actors', (table) => {
    table.string('nombre').primary().unique()
  }).then(() => {
    console.log("Table 'areas' created.")
  }).catch((err) => {
    console.error(err)
  })
}