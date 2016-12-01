## PinPoint

An app for Youtube content discovery.

### API

#### Authentication

To make an authenticated request besides login,
simply supply an `Authorization` header with a
value of `Bearer ${your_access_token_here}`.

Failure to provide a token will result in a 401 error.


#### Routes

1. `POST /signup`

**Params**:

`email`: An email address, must be unique.
`username`: A username, must be unique.
`password`: A password.

2. `POST /login`

**Params**:

`username`: String
`password`: String 
