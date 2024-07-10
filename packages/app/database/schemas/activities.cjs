/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.createTable = async function(knex) {
    await knex.schema.createTable('activities', (table) => {
      table.uuid('id').primary()
      table.string('action')
      table.string('description')
      table.uuid('user_id').references('users.id')
      table.uuid('document_id').references('documents.id')
      table.datetime('created_at').defaultTo(knex.fn.now())
    }).then(() => {
      console.log("Table 'documents' created.")
    }).catch((err) => {
      console.error(err)
    })
  }