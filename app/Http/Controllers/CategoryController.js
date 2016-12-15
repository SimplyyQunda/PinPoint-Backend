'use strict'

const Category = use('App/Model/Category')
const Channel = use('App/Model/Channel')
const UserCategory = use('App/Model/UserCategory')

class CategoryController {

  * index (request, response) {
    let cats = yield Category.query().orderBy('title').fetch()
    response.status(200).json(cats)
  }

  * show (request, response) {
    let catId = request.param('id')
    let category = yield Category.find(catId)
    let channels = yield Channel.query()
          .where('category_id', catId)
          .orderBy('score', 'desc').fetch()

    response.status(200).json({ category: category, channels: channels })
  }

  * update (request, response) {
    let user = request.authUser
    let catId = request.param('id')
    let category = yield Category.findOrFail(catId)

    if (user.admin) {
      let data = request.only('title', 'background_url')
      category.fill(data)
      yield category.save()

      response.status(202).json(category)
    } else {
      response.status(403).json({ error: "Only admins may edit categories." })
    }
  }

  * create (request, response) {
    let user = request.authUser

    if (user.admin) {
      let data = request.only('title')
      let newCat = yield Category.create(data)
      response.status(201).json(newCat)
    } else {
      response.status(403).json({ error: "Not an admin user" })
    }
  }

  * subscribe (request, response) {
    let user = request.authUser
    let id = request.param('id')
    let category = yield Category.findOrFail(id)

    let data = { category_id: id, user_id: user.id }
    let newSub = yield UserCategory.findOrCreate(data, data)
    response.status(201).json(newSub)
  }

}

module.exports = CategoryController
