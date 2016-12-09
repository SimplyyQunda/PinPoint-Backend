'use strict'

const Lucid = use('Lucid')
const Category = use('App/Model/Category')

class Channel extends Lucid {

  category () {
    return this.belongsTo(Category)
  }

  comments () {
    return this.hasMany('App/Model/Comment')
  }

  votes () {
    return this.hasMany('App/Model/ChannelVote')
  }

}

module.exports = Channel
