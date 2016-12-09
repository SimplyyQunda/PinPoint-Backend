'use strict'

const Schema = use('Schema')

class ChannelsTableSchema extends Schema {

  up () {
    this.table('channels', (table) => {
      table.float('score').default(0.0)
    })
  }

  down () {
    this.table('channels', (table) => {
      table.dropColumn('score')
    })
  }

}

module.exports = ChannelsTableSchema
