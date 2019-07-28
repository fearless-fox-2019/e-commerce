# e-commerce
Book-store themed E-commerce app for portofolio assignment hacktiv8 bootcamp


### Deploy

[e-commerce.jays.best](http://e-commerce.jays.best/)

### Usage
- make file .env from .env-template
- run code :
```
  $ npm install
```
- then just run this code to enable the server :
```
  $ npm run dev
```


### REST-API Routes


## User

| ROUTES          | HTTP | HEADERS | BODY/PARAMS                       | RESPONSE                              | DESCRIPTION      | VALIDATION |
|-----------------|------|---------|-----------------------------------|---------------------------------------|------------------|------------|
| /users          | GET  | -       | -                                 | [{_id, username, email}]              | find all user    | -          |
| /users/register | POST | -       | Body { username, password, email} | {_id, username, email, password}      | make new account | -          |
| /users/login    | POST | -       | Body { email, password }          | {token, {_id, username, email, role}} | get jwt token    | -          |


## Products 

**Notes** 

Products CRUD operation need admin token, so just create a new user with `role: admin`


| ROUTES          | HTTP | HEADERS | BODY/PARAMS                       | RESPONSE                              | DESCRIPTION      | VALIDATION |
|-----------------|------|---------|-----------------------------------|---------------------------------------|------------------|------------|
| /users          | GET  | -       | -                                 | [{_id, username, email}]              | find all user    | -          |
| /users/register | POST | -       | Body { username, password, email} | {_id, username, email, password}      | make new account | -          |
| /users/login    | POST | -       | Body { email, password }          | {token, {_id, username, email, role}} | get jwt token    | -          |


## Cart 

| ROUTES                         | HTTP   | HEADERS | BODY/PARAMS                                             | RESPONSE                                        | DESCRIPTION                               | VALIDATION       |
|--------------------------------|--------|---------|---------------------------------------------------------|-------------------------------------------------|-------------------------------------------|------------------|
| /carts                         | GET    | token   | -                                                       | -                                               | get all token for user based on the token | token must user  |
| /carts                         | POST   | token   | Body {  product : product id}                           | {_id, products, name, image, total, totalPrice} | add product to user cart                  | token must user  |
| /carts/deleteProduct/{cart id} | PATCH  | token   | Body {  product : product id}  params { cart : cart id} | {_id, products, name, image, total, totalPrice} | remove existing product in the cart       | token must user  |
| /carts/deleteCart{cart id}     | DELETE | token   | params { cart : cart id  }                              | -                                               | delete existing cart                      | token must admin |


## Transaction


| ROUTES                                   | HTTP   | HEADERS | BODY/PARAMS                                | RESPONSE                                               | DESCRIPTION                               | VALIDATION       |
|------------------------------------------|--------|---------|--------------------------------------------|--------------------------------------------------------|-------------------------------------------|------------------|
| /transactions                            | GET    | token   | -                                          | [{cart, user, address, courier, createdAt, updatedAt}] | get all user transaction                  | token must user  |
| /transactions/admin                      | GET    | token   | -                                          | [{cart, user, address, courier, createdAt, updatedAt}] | get all transactions                      | token must admin |
| /transactions                            | POST   | token   | Body { cart : cart id, address, courier, } | {cart, user, address, courier, createdAt, updatedAt}   | make a transaction                        | token must user  |
| /transactions/delivered/ {transaction d} | PATCH  | token   | Params { tranasactionId : transaction id}  | -                                                      | update transaction status to be delivered | token must user  |
| /transactions/{transaction id}           | DELETE | token   | params { transactionID : transaction id}   | -                                                      | delete an existing transacation           | token must admin |