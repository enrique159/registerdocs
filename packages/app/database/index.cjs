const fs = require('fs')
const path = require('path')
const knex = require('knex')(require('./knexfile.cjs'))

const initDB = async() => {
  const dbPath = path.join(__dirname, '../../../database.sqlite')

  if (!fs.existsSync(dbPath)) {
    console.log('Database not found, creating a new one...')
    fs.writeFileSync(dbPath, '')

    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('username')
      table.string('password')
    })

    console.log('Database created and initialized with tables.')
  } else {
    console.log('Database already exists.')
  }
}

module.exports = initDB
