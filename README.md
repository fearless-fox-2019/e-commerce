# e-commerce

## Deploy Link
http://------.irsantyohadi.com/

## Endpoint

baseUrl = http:localhost:3000/


#### User Routes
| Routes                                       | Method | Request Body                                | Response Data      | Response Error                                                                                            | Description          |
|----------------------------------------------|--------|---------------------------------------------|--------------------|-----------------------------------------------------------------------------------------------------------|----------------------|
| `/users/signup`                              | POST   | `{ name, username, email, password, cart }` | `{ access_token }` | 400 (`{email}` already used) <br>400 (`{email}` is not a valid email!) <br>  (`${username}` already used) | Register a new user  |
| `/users/signin`                              | POST   | `{ username, password }`                    | `{ access_token }` | 400 (Invalid email/password)                                                                              | Log in               |
| `/users/cart` (`{ headers: { token } }`)     | PATCH  | `{ cart }`                                  | `{ msg }`          | 500 (Internal Server Error) <br> 400(invalid token)                                                       | Update Cart for user |
| `/users/findById` (`{ headers: { token } }`) | GET    |                                             | `{ data_user }`    | 500 (Internal Server Error) <br> 400(invalid token) <br> 400(user not found)                              | Find User by Id      |

### Token is required!

#### Product Routes (`{ headers: { token } }`)

| Routes                                       | Method | Request Body                                | Response Data      | Response Error                                                                                            | Description          |
|----------------------------------------------|--------|---------------------------------------------|--------------------|-----------------------------------------------------------------------------------------------------------|----------------------|
| `/products/`                             | GET   | - | `{ data }`  | 500 (Internal Server Error) | get detail products |
| `/products/`                               | POST   | `{name,quantity,picture,description, price}`                 | `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User)                                                                            | Create a new Product!                |
| `/products/:id`    | DELETE | -                                  | `{ deleted }`          | 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                                            | Delete Product |
| `/products/:id` | PATCH   |               `{ quantity}`                                | `{ updated }`    | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | for update quantity after purchase  |
| `/products/:id` | PUT   |              `{name,quantity,picture,description, price}`                              | `{ updated }`    | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | for update detail product  |


#### Transaction Routes (`{ headers: { token } }`)

| Routes                                       | Method | Request Body                                | Response Data      | Response Error                                                                                            | Description          |
|----------------------------------------------|--------|---------------------------------------------|--------------------|-----------------------------------------------------------------------------------------------------------|----------------------|
| `/transactions/`                             | GET   | - | `{ data }`  | 500 (Internal Server Error) | get detail transaction for specific user |
| `/transactions/`                               | POST   | `{userID,items, totalPrice}`                | `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User)                                                                            | Create a new Transaction!                |
| `/transactions/all`    | GET | -                                  | `{ data }`          | 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error)                                            | Get all list of transaction |
