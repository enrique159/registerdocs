const fs = require('fs')
const path = require('path')
const knex = require('knex')(require('./knexfile.cjs'))
const seeds = require('./seeds/init_seed.cjs')
const users = require('./schemas/users.cjs')
const documents = require('./schemas/documents.cjs')
const areas = require('./schemas/areas.cjs')
const actors = require('./schemas/actors.cjs')

const initDB = async() => {
  const dbPath = path.join(__dirname, '../../../database.sqlite')

  if (!fs.existsSync(dbPath)) {
    console.log('Database not found, creating a new one...')
    fs.writeFileSync(dbPath, '')

    await users.createTable(knex)
    await areas.createTable(knex)
    await documents.createTable(knex)
    await actors.createTable(knex)

    console.log('Database created and initialized with tables.')

    /* INSERT DEFAULT USER */
    await seeds.seed(knex)
  } else {
    console.log('Database already exists.')
  }
}

module.exports = initDB
