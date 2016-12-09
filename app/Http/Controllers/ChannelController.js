'use strict'

const Channel = use("App/Model/Channel")
const ChannelVote = use('App/Model/ChannelVote')

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

  * vote (request, response) {
    let user = request.authUser
    let chanId = request.param('id')
    let channel = yield Channel.findOrFail(chanId)
    let score = Number(request.input('score', 0))
    let previousVote = {
      user_id: user.id,
      channel_id: chanId
    }

    let userVoted = yield ChannelVote.query()
          .where(previousVote).fetch()

    // This code is awful but hey, expedient thing that works.
    if (userVoted.value().length === 0) {
      let data = Object.assign(previousVote, { score: score })
      let newVote = yield ChannelVote.create(data)
      channel.score += newVote.score
      yield channel.save()
      response.status(201).json({ vote: newVote, channel: channel })
    } else {
      let oldVote = userVoted.value()[0]
      let diff = score - oldVote.score
      oldVote.score = score
      yield oldVote.save()
      channel.score += diff
      yield channel.save()
      response.status(202).json({ vote: oldVote, channel: channel })
    }

  }

}

module.exports = ChannelController
