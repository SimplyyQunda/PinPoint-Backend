'use strict'

const Schema = use('Schema')

class AddAdminToUsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.boolean('admin').default('false').notNull()
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('admin')
    })
  }

}

module.exports = AddAdminToUsersTableSchema
