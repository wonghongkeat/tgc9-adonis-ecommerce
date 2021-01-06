'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterPublishersSchema extends Schema {
  up () {
    this.table('publishers', (table) => {
      // alter table
      table.string('email', 254).notNullable().default("");
    })
  }

  down () {
    this.table('publishers', (table) => {
      // reverse alternations
      table.dropColumn('email');
    })
  }
}

module.exports = AlterPublishersSchema
