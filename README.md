## PinPoint

An app for Youtube content discovery.

Live on Heroku at: https://pure-refuge-11026.herokuapp.com/

### API

#### Authentication

To make an authenticated request besides login,
simply supply an `Authorization` header with a
value of `Bearer ${your_access_token_here}`.

Failure to provide a token will result in a 401 error.

**Any route with a (*) after its name requires
token authentication!**

#### Routes

1. Create a User

  `POST /signup`

  **Params**:

  * `email`: An email address, must be unique.
  * `username`: A username, must be unique.
  * `password`: A password.

2. Get an Access Token

  `POST /login`

  **Params**:

  * `username`: String
  * `password`: String 

3. Create a Category (Must be an admin) *

  `POST /categories`
  
  **Params**:

  * `title`: String
  
4. Get List of Categories

  `GET /categories`

5. Add a Channel
