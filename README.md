**MINI-WP**
----------------------------------------

## Endpoint

baseUrl = http://localhost:3000/api
### *Doesn't Require Token*

#### User Routes


| Routes| Method | Request Body | Response Data| Response Error | Description |
|----------------------|--------|-----------------------------|-----------------------------------|--|---------------------------------------------------------------|
| `/users/register`| POST | `{ username, email, password }` | `{ access_token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br>  (`${username}` has been registered!)|Register a new user|
| `/users/login` | POST | `{ email, password }`| `{ name, access_token }`| 400 (Wrong email/password) |Log in and get an email verification!|
| `/users/googleSignIn` | POST | `{ id_token }` | `{ name, newPass, access_token }` | |Sign in with Google and get a new password! |

### Token is required!

#### Article Routes (`{ headers: { token } }`)
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-----------------------------------|--------|----------------------------------|------------------|---------------------|------------------------------------------------------------------------------|
| `/articles/findAll`| GET | -| `{ data }`| 401(Please Login) <br> 500 (Internal Server Error) | 
| `/articles/createArticle` | POST | `{title,content,userId,imageUrl}`| `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User)| Create a new Article! |
| `/articles/deleteArticle/:id` | DELETE | -| `{ deleted }`| 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Delete an Article|
| `/articles/findMyArticles`| GET |  | | 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Read an article |
| `/articles/:id` | PATCH| -| `{updated }`| 401 (Invalid Token) <br> 401 (Please login ) <br> 401 Unauthorized <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Updated an article! |

# E-COMMERCE SHOES API
Welcome to an E-Commerce based on Shoes API! Here I will show you how to use my RESTFUL APIs and make different queries listed below!



# REST
Base url : http://localhost:3000/api
Sample Request

    {
	    "users": http://localhost:3000/api/users,
	    "shoes": http://localhost:3000/api/shoes,
	    "transactions": http://localhost:3000/api/transactions,
	    "cart": http://localhost:3000/api/carts
    }

There are three available resources:

 - User: used to Login or Register to your account
 - Shoes: CRUD shoes (admin only)
 - transactions: after checking out from cart, transactions will be here
 - carts: user can add their products to the cart

# User

## Routing Register

    METHOD: POST
    http://localhost:3000/users/register

**Required:**

    body: {
	    username: String,
	    email: String,
	    password: String
    }
**Success Response:**

    Code: 201
    Content: {
	    userCreated
    }
**Error Response:**

    Code: 400
    Content: {
	    Email format is wrong
    } 

    
## Routing login

    METHOD: POST
    http://localhost:3000/users/login

**Required:**
	

    body: {
	    email: String,
	    password: String
    }
  
**Success Response:**

    Code: 200
    Content: {
	    token
    }

**Error Response:**

    Code: 401
    Content: {
	    error: "Email/password is wrong"
    }

