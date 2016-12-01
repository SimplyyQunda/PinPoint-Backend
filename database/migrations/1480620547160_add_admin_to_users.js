'use strict'

const Schema = use('Schema')

class AddAdminToUsersTableSchema extends Schema {

  up () {
    this.table('add_admin_to_users', (table) => {
      table.boolean('admin').default('false').notNull()
    })
  }

  down () {
    this.table('add_admin_to_users', (table) => {
      table.dropColumn('admin')
    })
  }

}

module.exports = AddAdminToUsersTableSchema
