const path = require('path')
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../../database.sqlite'),
  },
  migrations: {
    directory: path.join(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
}
