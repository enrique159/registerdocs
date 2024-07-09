/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.createTable = async function(knex) {
  await knex.schema.createTable('documents', (table) => {
    table.uuid('id').primary()
    table.date('fecha')
    table.string('numero_oficio')
    table.string('enviado_por')
    table.string('cargo')
    table.string('asunto')
    table.string('dirigido_a')
    table.string('documento')
    table.integer('area_id').unsigned().references('areas.id')
    table.integer('user_id').unsigned().references('users.id')
    table.datetime('created_at').defaultTo(knex.fn.now())
  }).then(() => {
    console.log("Table 'documents' created.")
  }).catch((err) => {
    console.error(err)
  })
}