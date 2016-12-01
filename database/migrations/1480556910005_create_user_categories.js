'use strict'

const Schema = use('Schema')

class UserCategoriesTableSchema extends Schema {

  up () {
    this.create('user_categories', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').references('id').inTable('users')
      table.integer('category_id').references('id').inTable('categories')
    })
  }

  down () {
    this.drop('user_categories')
  }

}

module.exports = UserCategoriesTableSchema
