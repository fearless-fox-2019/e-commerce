**Ecommerce**
----------------------------------------
## Endpoint
baseUrl = http:localhost:3000

#### User Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| /users/register| POST | { name, email, password } | { access_token } | 400(email has been registered!) <br>400(email format is wrong!)<br> 400(email required!)<br> 400(password length more than 6 characters!)<br> 400(password required!)|Register a new user|
| /users/login | POST | { email, password }| { name, access_token }| 400(email/password wrong!) |Log in|


#### Game Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| /games | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Game data
| /games/:id | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Single data
| /games | POST | {name, description, image, price, stock, screenshots} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Game|
| /games/:id | DELETE | - | { completed } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Game |
| /games/:id| PATCH | - | { success } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Game data |
| /games/upload | POST | - | ${ success message }| 401 (Invalid Token)<br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Upload image to Google Cloud Storage |


#### Cart Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| /carts | POST | {UserId, GameId, quantity, totalPrice, checkoutStatus} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Cart|
| /carts | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Cart data
| /carts/:id | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Single data
| /carts/:id | DELETE | - | { completed } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Cart |
| /carts/:id| PATCH | - | { success } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Cart data |


#### Transaction Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| /transactions | POST | {products, , quantity, UserId, transactionDate} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Transaction|
| /transactions | GET | - | { data }|  401 (Invalid Token)<br> 401 (you have to login first!) <br> 500 (Internal Server Error) |  Get Transaction data |
| /transactions/:id | PATCH | - | { data } |  401 (Invalid Token)<br> 401 (you have to login first!) <br> 500 (Internal Server Error) |  Get Transaction data |