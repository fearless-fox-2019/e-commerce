**Ecommerce**
----------------------------------------
## Endpoint
baseUrl = http:localhost:3000

#### User Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| /users/register| POST | { name, email, password } | { access_token } | 400(email has been registered!) <br>400(email format is wrong!)<br> 400(email required!)<br> 400(password length more than 6 characters!)<br> 400(password required!)|Register a new user|
| /users/login | POST | { email, password }| { name, access_token }| 400(email/password wrong!) |Log in|
| /users/loginGoogle | POST | { id_token } | { name, access_token } | |Sign in with Google|


#### Game Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| / | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Game data
| /:id | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Single data
| / | POST | {name, description, image, price, stock, screenshots} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Game|
| /:id | DELETE | - | { completed } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Game |
| /:id| PATCH | - | { success } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Game data |
| /upload | POST | - | ${ success message }| 401 (Invalid Token)<br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Upload image to Google Cloud Storage |


#### Cart Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| / | POST | {UserId, GameId, quantity, totalPrice, checkoutStatus} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Cart|
| / | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Cart data
| /:id | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Single data
| /:id | DELETE | - | { completed } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Delete your Cart |
| /:id| PATCH | - | { success } | 401 (Invalid Token)<br> 401 (you have to login first!) <br> 404 (Unauthorized) <br> 500 (Internal Server Error) | Edit Cart data |


#### Transaction Routes
| `Routes`| `Method` | `Request Body` | `Response Data`| `Response Error` | `Description` |
|---------|----------|----------------|----------------|------------------|---------------|
| / | POST | {products, , quantity, UserId, transactionDate} | { data }| 401 (Invalid Token) <br> 401 (you have to login first!) <br> 500 (Internal Server Error) | Create new Transaction|
| / | GET | - | { data }| <br> 500 (Internal Server Error) |  Get Transaction data |