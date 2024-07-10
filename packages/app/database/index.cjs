const fs = require('fs')
const path = require('path')
const knex = require('knex')(require('./knexfile.cjs'))
const seeds = require('./seeds/init_seed.cjs')
const configuration = require('./schemas/configuration.cjs')
const users = require('./schemas/users.cjs')
const documents = require('./schemas/documents.cjs')
const areas = require('./schemas/areas.cjs')
const actors = require('./schemas/actors.cjs')
const activities = require('./schemas/activities.cjs')
const os = require('os')

const initDB = async() => {
  const destinationPath = path.join(os.homedir(), '.db')
  const dbPath = path.join(destinationPath, 'registerdocs.sqlite')

  if (!fs.existsSync(dbPath)) {
    console.log('Database not found, creating a new one...')
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath)
    }
    fs.writeFileSync(dbPath, '')

    await configuration.createTable(knex)
    await users.createTable(knex)
    await areas.createTable(knex)
    await documents.createTable(knex)
    await actors.createTable(knex)
    await activities.createTable(knex)

    console.log('Database created and initialized with tables.')

    /* INSERT DEFAULT USER */
    await seeds.seed(knex)
  } else {
    console.log('Database already exists.')
  }
}

module.exports = initDB
