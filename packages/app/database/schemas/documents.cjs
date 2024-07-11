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
    table.string('documento', 500)
    table.uuid('area_id').references('areas.id')
    table.uuid('user_id').references('users.id')
    table.datetime('created_at').defaultTo(knex.fn.now())
  }).then(() => {
    console.log("Table 'documents' created.")
  }).catch((err) => {
    console.error(err)
  })
}