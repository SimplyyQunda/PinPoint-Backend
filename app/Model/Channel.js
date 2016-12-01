'use strict'

const Lucid = use('Lucid')
const Category = use('App/Model/Category')

class Channel extends Lucid {

  category () {
    return this.belongsTo(Category)
  }

}

module.exports = Channel
