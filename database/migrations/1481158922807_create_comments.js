'use strict'

const Schema = use('Schema')

class CommentsTableSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
      table.timestamps()
      table.text('text')
      table.integer('user_id').references('id').inTable('users')
      table.integer('channel_id').references('id').inTable('channels')
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentsTableSchema
