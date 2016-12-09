'use strict'

const Lucid = use('Lucid')

class ChannelVote extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  channel () {
    return this.belongsTo('App/Model/Channel')
  }

}

module.exports = ChannelVote
