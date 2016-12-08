'use strict'

const Channel = use("App/Model/Channel")

class ChannelController {

  * create (request, response) {
    let data = request.only('category_id', 'url', 'title', 'description', 'google_id', 'subscriber_count', 'comment_count', 'video_count')

    let valid = data.google_id && data.title && data.category_id

    if (valid) {
      let channel = yield Channel.create(data)
      response.status(201).json(channel)
    } else {
      response.status(422).json({ error: "Incomplete data - need google_id and title" })
    }

  }

  * show (request, response) {
    let chanId = request.param('id')
    let channel = yield Channel.findOrFail(chanId)
    yield channel.related('comments').load()

    response.status(200).json(channel)
  }

}

module.exports = ChannelController
