'use strict'

const Lucid = use('Lucid')

class UserCategory extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  category () {
    return this.belongsTo('App/Model/Category')
  }

}

module.exports = UserSubscription
