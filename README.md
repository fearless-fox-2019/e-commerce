# E-commerce

Table of API routes

All the route used in this API using url: http://localhost:3000

| Routes  | method  | description  | headers  | body  | request  |
|---|---|---|:-:|---|---|
| /users/register  | POST  | register new user  | none  | username:String<br>email:String<br>password:String  | body  |
| /users/login  | POST  | login user  | none  | email:String<br>password:String  | body  |
| /items  | POST  | create new item  | token:String  | name:String<br>price:Number<br>  | body  |
| /items  | GET  | get all items  | none  | none  | none  |
| /items/:itemId  | GET  | get one item  | none  | none  | params  |
| /items/:itemId/edit  | POST  | update an item  | token:String  | name:String<br>price:Number  | body,params  |
| /items/:itemId/delete  | POST  | delete an item  | token:String  | id:Object  | body,params  |

## Response

### Register
### Login
