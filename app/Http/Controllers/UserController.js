'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')
const Channel = use('App/Model/Channel')
const Database = use('Database')

class UserController {

  * register (request, response) {
    let data = request.only('email', 'username', 'password')
    data.password = yield Hash.make(data.password)
    let user = yield User.create(data)

    response.status(201).json(user)
  }

  * login (request, response) {
    let data = request.only('username', 'password')
    let user = yield User.findBy('username', data.username)

    try {
      // NOTE: If user is null, this TypeErrors which is caught below
      let verify = yield Hash.verify(data.password, user.password)
      if (!verify) { throw new Error(); }

      let token = yield request.auth.generate(user)
      user.access_token = token

      response.json(user)
    } catch (e) {
      response.status(401).json({ error: "No such user or password" })
    }

  }

  * subscriptions (request, response) {
    let user = request.authUser
    console.log(user.username, user.id)
    // let cats = yield user.categories().query().with('channels').fetch()
    // let cats = yield user.query().with('categories.channels').fetch()
    let channels = yield Database.table('user_categories')
          .where('user_id', user.id)
          .innerJoin('categories', 'categories.id', 'user_categories.category_id')
          .innerJoin('channels', 'channels.category_id', 'categories.id')
    response.status(200).json(channels)
  }

}

module.exports = UserController
