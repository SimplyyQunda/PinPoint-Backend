'use strict'

const Comment = use('App/Model/Comment')
const Channel = use('App/Model/Channel')

class CommentController {

  * create (request, response) {
    let user = request.authUser
    let chanId = request.param('id')
    let channel = yield Channel.find(chanId)

    if (channel) {
      let data = request.only('text')
      data.user_id = user.id
      data.channel_id = chanId
      let comment = yield Comment.create(data)
      response.status(201).json(comment)
    } else {
      response.status(404).json({ error: "No such channel" })
    }
  }

  * delete (request, response) {
    let user = request.authUser
    let comment = yield Comment.find(request.param('comment_id'))

    if (user.id === comment.user_id) {
      yield comment.delete()
      response.status(204).json({})
    } else {
      response.status(403).json({ error: "You can only delete your own comments." })
    }
  }

}

module.exports = CommentController
