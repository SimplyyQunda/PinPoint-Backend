'use strict'

const Schema = use('Schema')

class ChannelVotesTableSchema extends Schema {

  up () {
    this.create('channel_votes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').notNull().references('id').inTable('users')
      table.integer('channel_id').notNull().references('id').inTable('channels')
      table.integer('score').notNull()
    })
  }

  down () {
    this.drop('channel_votes')
  }

}

module.exports = ChannelVotesTableSchema
