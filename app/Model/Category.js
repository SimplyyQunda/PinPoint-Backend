'use strict'

const Lucid = use('Lucid')
const Channel = use('App/Model/Channel')

class Category extends Lucid {

  channels () {
    return this.hasMany(Channel)
  }

}

module.exports = Category
