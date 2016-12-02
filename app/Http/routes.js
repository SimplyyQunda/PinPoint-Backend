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
Route.post('/categories/:id/subscribe', 'CategoryController.subscribe').middleware('auth')
Route.post('/channels', 'ChannelController.create')

Route.get('/subscriptions', 'UserController.subscriptions').middleware('auth')
