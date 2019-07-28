#### Deployed at : https://hacktivgun.fildabert.com


## User Schema
| Key | Type | Description |
| --- | ---- | ----------- |
|username|String|user's username|
| email | String | user's email |
| password | String | user's password |
| balance | Number | user's balance |
| admin | Boolean | Admin Status(false by default)|

#### Register User

```
POST
http://localhost:3000/users/register
Body:
{
    username: filbert1,
    email: filbert1@mail.com
    password: filbert1
}
```

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTYyNiwiZXhwIjoxNTYzNzU3MjI2fQ.bSrSYG5EzlN8yRU9rMgz8TV_cAFReRp7way2IyAHZV8",
    "username": "filbert1"
}
```

#### Login User

```
POST
http://localhost:3000/users/login
Body:
{
    username: "filbert1",
    password: "filbert1"
}
```

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw",
    "username": "filbert1"
}
```

## Product Schema

| Key | Type | Description |
| --- | ---- | ----------- |
|title|String| product's title |
|description|String| product's description |
|price|Number| product's price |
|weaponType|String| product's type |
|image|String| product's image url |
|stock|Number| product's stock |


#### Get all products
```
GET
http://localhost:3000/products/all
Body:
{
  [
    {
      _id: '5d3db1c327fb361d4c520551',
      title: 'Product Title123',
      description: 'Product Description',
      price: 1000,
      weaponType: 'Assault Rifle',
      image: 'https://storage.googleapis.com/hacktivgun.fildabert.com/1564324290396mp-5.png',
      stock: 20,
      __v: 0
    },
    {
      _id: '5d3db1ce27fb361d4c520554',
      title: 'Product Title1322',
      description: 'Product Description',
      price: 1000,
      weaponType: 'Assault Rifle',
      image: 'https://storage.googleapis.com/hacktivgun.fildabert.com/1564324291883mp-5.png',
      stock: 5,
      __v: 0
    }
  ]
}
```

#### Create a product(admin only)
```
POST
http://localhost:3000/products/add
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body: 
{
  _id: '5d3db1c327fb361d4c520551',
  title: 'Product Title123',
  description: 'Product Description',
  price: 1000,
  weaponType: 'Assault Rifle',
  image: 'https://storage.googleapis.com/hacktivgun.fildabert.com/1564324290396mp-5.png',
  stock: 20,
  __v: 0
}
```

#### Edit a product(admin only)
```
PUT
http://localhost:3000/products/edit/:id
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  _id: '5d3db1c327fb361d4c520551',
  title: 'Product Title123',
  description: 'Product Description',
  price: 1000,
  weaponType: 'Assault Rifle',
  image: 'https://storage.googleapis.com/hacktivgun.fildabert.com/1564324290396mp-5.png',
  stock: 20,
  __v: 0
}
```

#### Delete all products(admin only)
```
DELETE
http://localhost:3000/products/delete/:id
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  deletedCount: 1
}

```

#### Reduce stock of product
```
PATCH
http://localhost:3000/products/decrement/:id
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  _id: '5d3db1c327fb361d4c520551',
  title: 'Product Title123',
  description: 'Product Description',
  price: 1000,
  weaponType: 'Assault Rifle',
  image: 'https://storage.googleapis.com/hacktivgun.fildabert.com/1564324290396mp-5.png',
  stock: 15,
  __v: 0
}
```


## Cart Schema

| Key | Type | Description |
| --- | ---- | ----------- |
|status| String |cart's status(ordered, pending, sent, received)|
|userId| ObjectId |cart's UserId|
|product|ObjecetId |cart's product items|
|quantity| Number |cart's product quantity|
|checkoutDate| Date |cart's checkout date|

router.get("/all", authenticate, cartController.findCart)
router.post("/add", authenticate, cartController.create)
router.put("/updatestatus", authenticate, cartController.updateCart)
router.put("/updatequantity", authenticate, cartController.updateQuantity)
router.delete("/delete", authenticate, cartController.deleteCart)
router.get("/transactions/admin", authenticate, authorize, cartController.getAllPendingTransactions)
router.patch("/transactions/admin", authenticate, authorize, cartController.updateTransactions)
router.patch("/transactions/complete", authenticate, cartController.updateTransactions)
router.get("/transactions/:status", authenticate, cartController.getTransactions)

#### Get all ordered transactions
```
GET
http://localhost:3000/cart/all
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
},
Body:
[
    {
    _id: '5d3dc95a98aa5a0c7e53b37a',
    status: 'ordered',
    userId: '5d3dc94f98aa5a0c7e53b378',
    product: '5d3dc95a98aa5a0c7e53b379',
    quantity: 2,
    checkoutDate: null,
    __v: 0
    },
    {...Cart}
]
```

#### Create a cart
```
POST
http://localhost:3000/cart/add
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  _id: '5d3dc95a98aa5a0c7e53b37a',
  status: 'ordered',
  userId: '5d3dc94f98aa5a0c7e53b378',
  product: '5d3dc95a98aa5a0c7e53b379',
  quantity: 2,
  checkoutDate: null,
  __v: 0
}
```

#### Cart Checkout
```
PUT
http://localhost:3000/cart/updatestatus
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
},
Body: 
{
  _id: '5d3dc95a98aa5a0c7e53b37a',
  status: 'pending',
  userId: '5d3dc94f98aa5a0c7e53b378',
  product: '5d3dc95a98aa5a0c7e53b379',
  quantity: 2,
  checkoutDate: 2021-10-12,
  __v: 0
}
```

#### Update quantity of items in a cart
```
PUT
http://localhost:3000/cart/updatequantity
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  _id: '5d3dc95a98aa5a0c7e53b37a',
  status: 'ordered',
  userId: '5d3dc94f98aa5a0c7e53b378',
  product: '5d3dc95a98aa5a0c7e53b379',
  quantity: 10,
  checkoutDate: null,
  __v: 0
}
```

#### Delete a cart
```
DELETE
http://localhost:3000/cart/delete
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body: 
{
    deletedCount: 1
}
```

#### Get all pending transactions (admin)
```
GET
http://localhost:3000/cart/transactions/admin
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
[
    {
    _id: '5d3dc95a98aa5a0c7e53b37a',
    status: 'pending',
    userId: '5d3dc94f98aa5a0c7e53b378',
    product: '5d3dc95a98aa5a0c7e53b379',
    quantity: 2,
    checkoutDate: 2021-10-12,
    __v: 0
    },
    {...Cart}
]
```

#### Approve a transaction order pending -> sent (admin)
```
PATCH
http://localhost:3000/cart/transactions/admin
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  _id: '5d3dc95a98aa5a0c7e53b37a',
  status: 'sent',
  userId: '5d3dc94f98aa5a0c7e53b378',
  product: '5d3dc95a98aa5a0c7e53b379',
  quantity: 2,
  checkoutDate: 2021-10-12,
  __v: 0
}
```

#### Update transaction status to complete
```
PATCH
http://localhost:3000/cart/transactions/complete
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
{
  _id: '5d3dc95a98aa5a0c7e53b37a',
  status: 'complete',
  userId: '5d3dc94f98aa5a0c7e53b378',
  product: '5d3dc95a98aa5a0c7e53b379',
  quantity: 2,
  checkoutDate: null,
  __v: 0
}
```

#### Get transaction by status (admin)
```
POST
http://localhost:3000/cart/transactions/:status
headers:
{
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM0YjY0YTZiM2UzZTIxNjZhMGE5ODYiLCJ1c2VybmFtZSI6ImZpbGJlcnQxIiwiZW1haWwiOiJmaWxiZXJ0MUBtYWlsLmNvbSIsImlhdCI6MTU2MzczNTk1MiwiZXhwIjoxNTYzNzU3NTUyfQ.tu0aOvkkU5z7z2XQMjQU3QLYMXAfY9APndUftGvQrSw
}
Body:
[
    {
    _id: '5d3dc95a98aa5a0c7e53b37a',
    status: 'complete',
    userId: '5d3dc94f98aa5a0c7e53b378',
    product: '5d3dc95a98aa5a0c7e53b379',
    quantity: 2,
    checkoutDate: null,
    __v: 0
    },
    {...Cart}
]
```

## Error Cases

```
400: BAD REQUEST
Usually happens when user made a bad request. eg: failing to fill in all the required fields or filling an invalid input type 
{
    code: 400,
    message: (Error Message) 
}
```

```
401: UNAUTHORIZED
Usually happens when user is not authorized to make an action. eg: Attempting to create an article without loggin in first
{
    code: 401,
    message: (Error Message)
}
```

```
404: NOT FOUND
Usually happens when user is making a request to a path that does not exist
{
    code: 404,
    message: (Error Message)
}
```

```
500: INTERNAL SERVER ERROR
Happens when there is an error on the backend side
{
    code: 500,
    message: Internal Server Error
}
```