const fs = require('fs')
const path = require('path')
const knex = require('knex')(require('./knexfile.cjs'))
const seeds = require('./seeds/init_seed.cjs')

const initDB = async() => {
  const dbPath = path.join(__dirname, '../../../database.sqlite')

  if (!fs.existsSync(dbPath)) {
    console.log('Database not found, creating a new one...')
    fs.writeFileSync(dbPath, '')

    /* CREATE USER TABLE */
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('username')
      table.string('password')
    })
    console.log("Table 'users' created.")

    /* CREATE DOCUMENTS TABLE */
    await knex.schema.createTable('documents', (table) => {
      table.increments('id').primary()
      table.string('fecha')
      table.string('numero_oficio')
      table.string('enviado_por')
      table.string('cargo')
      table.string('asunto')
      table.string('dirigido_a')
      table.string('documento')
      table.integer('area_id').unsigned().references('areas.id')
      table.integer('user_id').unsigned().references('users.id')
    })
    console.log("Table 'documents' created.")

    /* CREATE AREAS TABLE */
    await knex.schema.createTable('areas', (table) => {
      table.increments('id').primary()
      table.string('nombre')
    })
    console.log("Table 'areas' created.")

    console.log('Database created and initialized with tables.')

    /* INSERT DEFAULT USER */
    await seeds.seed(knex)
  } else {
    console.log('Database already exists.')
  }
}

module.exports = initDB
