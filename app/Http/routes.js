'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/signup', 'UserController.register')
Route.post('/login', 'UserController.login')

Route.get('/categories', 'CategoryController.index')
Route.post('/categories', 'CategoryController.create').middleware('auth')
Route.get('/categories/:id', 'CategoryController.show')
Route.put('/categories/:id', 'CategoryController.update').middleware('auth')
Route.post('/categories/:id/subscribe', 'CategoryController.subscribe').middleware('auth')
Route.post('/channels', 'ChannelController.create')
Route.put('/channels/:id/vote', 'ChannelController.vote').middleware('auth')

Route.get('/subscriptions', 'UserController.subscriptions').middleware('auth')


Route.get('/channels/:id', 'ChannelController.show')
Route.post('/channels/:id/comments', 'CommentController.create').middleware('auth')
Route.delete('/channels/:id/comments/:comment_id', 'CommentController.delete').middleware('auth')
