'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static get hidden () {
    return ['password']
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  subscriptions () {
    return this.hasMany('App/Model/UserCategory')
  }

  categories () {
    return this.belongsToMany('App/Model/Category', 'user_categories', 'user_id', 'category_id')
  }

}

module.exports = User
