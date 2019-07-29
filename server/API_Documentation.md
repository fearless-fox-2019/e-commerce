# E-Commerce API

## User Authentication

* ### POST **/auth/register**

Description : Register a new user account <br>

URL Structure :

    POST http://localhost:3000/auth/register

Request Body :

```js
{
    "email": "lycan@mail.com",
    "username": "Lycan Jr",
    "password": "lycanpass"
}
```

Response **201** :

```js
{
    "message" : "succeed"
}
```

<br>

* ### POST **auth/login**

Description : Login an user to the app and get token

URL Structure :

    POST http://localhost:3000/auth/login

Request Body : 

```js
{
    "email": "lycan@mail.com",
    "password": "lycanpass"
}
```

Response **200** : 

```js
{
    "token": "ABCDEFG"
}
```

***

## Item

* ### GET **/items**

Description : Find all items in shop which are in stock or not

URL Structure :

    GET http://localhost:3000/items

Response **200**

```js
[
    {
        "_id": "a1b2c3"
        "name": "Oneplus 7 Pro",
        "description": "Snapdragon Octa Core, 12GB RAM, 256GB ROM",
        "price": 11500000,
        "stock": 23
    },
    {
        "_id": "a2b3c4",
        "name": "Samsung Galaxy S10",
        "descriptiton": "Snapdragon Octa Core, 8GB RAM, 128GB",
        "price": 12999000,
        "stock": 30
    }
]
```

<br>

* ### POST **items/**

Description : Add an item to shop

URL Structure : 

    POST http://localhost:3000/items

Request Headers : 

```js
{
    "token": "ABCDEFG"
}
```

Request Body : 

```js
{
    "name": "Oneplus 7 Pro",
    "description": "Snapdragon Octa Core, 12GB RAM, 256GB ROM",
    "price": 11500000,
    "stock": 25
}
```

Response : 

```js
{
    "id": "a1b2c3",
    "name": "Oneplus 7 Pro",
    "description": "Snapdragon Octa Core, 12GB RAM, 256GB ROM",
    "price": 11500000,
    "stock": 25
}
```

<br>

* ### GET **items/:id**

Description : Find specific item using item's ID

URL Structure : 

    GET http://localhost:3000/items/a1b2c3

Response : 

```js
{
    "id": "a1b2c3",
    "name": "Oneplus 7 Pro",
    "description": "Snapdragon Octa Core, 12GB RAM, 256GB ROM",
    "price": 11500000,
    "stock": 25
}
```

<br>

* ### PUT **items/:id**

Description : Update an item in shop

URL Structure

    PUT http://localhost:3000/items/a1b2c3

Request Headers :

```js
{
    "token" : "ABCDEFG"
}
```

Request Body : 
```js
{
    "price": 11000000,
    "stock": 20
}
```

***

## CART

* ### POST **/carts**

Request Headers : 

```js
{
    "token": "ABCDEFG"
}
```

Request Body : 

```js
{
    "itemId": "abcdefg",
    "quantity": 2
}
```

Response : 

```js
{
    "message": "succeed",
    "id": "abcdefg"
}
```

* ### DELETE **/carts/:id**

Request Headers : 

```js
{
    "token": "ABCDEFG"
}
```

Response : 

```js
{
    "message": "succeed",
    "id": "abcdefg"
}
```