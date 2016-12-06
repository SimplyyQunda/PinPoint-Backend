'use strict'

const Category = use('App/Model/Category')
const UserCategory = use('App/Model/UserCategory')

class CategoryController {

  * index (request, response) {
    let cats = yield Category.all()
    response.status(200).json(cats)
  }

  * show (request, response) {
    let catId = request.param('id')
    let cat = yield Category.find(catId)
    yield cat.related('channels').load()

    response.status(200).json(cat)
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
    let category = yield Category.find(id)

    if (category) {
      let data = { category_id: id, user_id: user.id }
      let newSub = yield UserCategory.create(data)
      response.status(201).json(newSub)
    } else {
      response.status(404).json({ error: "No such category: " + id })
    }
  }

}

module.exports = CategoryController
