'use strict'

const Hash = use('Hash')
const User = use('App/Model/User')
const Channel = use('App/Model/Channel')

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
    // let cats = yield user.categories().query().with('channels').fetch()
    // let cats = yield user.query().with('categories.channels').fetch()
    let cats = yield user.categories().pluck('id')
    let channels = yield Channel.query()
          .whereIn('category_id', cats).fetch()
    response.status(200).json(channels)
  }

}

module.exports = UserController
