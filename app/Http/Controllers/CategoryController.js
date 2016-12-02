'use strict'

const Category = use('App/Model/Category')

class CategoryController {

  * index (request, response) {
    let cats = yield Category.all()
    response.status(200).json(cats)
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

  * category (request, response) {
    let user = request.authUser
    let id = request.param('id')
    let category = yield Category.find(id)

    if (category) {
      let newSub = yield user.subscriptions.create({ category_id: category.id })
      response.status(201).json(newSub)
    } else {
      response.status(404).json({ error: "No such category: " + id })
    }
  }

}

module.exports = CategoryController
