'use strict'

const Env = use('Env')
const Ouch = use('youch')
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {

  if (error.name === 'ModelNotFoundException') {
    let id = request.param('id')
    response.status(404).json({ error: `No record with matching ID in database: ${id}` })
    return
  }

  const status = error.status || 500
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
}
