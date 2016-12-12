'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.table('categories', (table) => {
      table.string('background_url')
    })
  }

  down () {
    this.table('categories', (table) => {
      table.dropColumn('background_url')
    })
  }

}

module.exports = CategoriesTableSchema
