/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.createTable = async function(knex) {
    await knex.schema.createTable('configuration', (table) => {
      table.increments('id').primary()
      table.boolean('inicializado').defaultTo(false)
      table.string('ruta_recursos').nullable()
    }).then(() => {
      console.log("Table 'configuration' created.")
    }).catch((err) => {
      console.error(err)
    })
  }