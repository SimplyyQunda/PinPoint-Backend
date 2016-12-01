'use strict'

const Schema = use('Schema')

class ChannelsTableSchema extends Schema {

  up () {
    this.create('channels', (table) => {
      table.increments()
      table.timestamps()
      table.integer('category_id').references('id').inTable('categories')
      table.string('google_id').notNull()
      table.string('title').notNull()
      table.string('url').notNull()
      table.string('desc')
      table.integer('subscriber_count')
      table.integer('comment_count')
      table.integer('video_count')
    })
  }

  down () {
    this.drop('channels')
  }

}

module.exports = ChannelsTableSchema
