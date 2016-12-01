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
      let data = response.only('title')
      let newCat = yield Category.create(data)
      response.status(201).json(newCat)
    } else {
      response.status(403).json({ error: "Not an admin user" })
    }
  }

}

module.exports = CategoryController
