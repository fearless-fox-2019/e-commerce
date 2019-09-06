# e-commerce

link deploy = http://belanjaasik.zahriahfriska.xyz

## Getting Started
 * npm install 
 * `nodemon app.js` or `npm run dev` for running in server port
 * `npm run serve` for running in client port
 

list of routes :
```
http://localhost/3000/users
http://localhost/3000/products
http://localhost/3000/carts

```

### list of `users` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/users/register | POST| none | firstname:String, lastname:String, email:String, Password:string (all required)| Create a new user
/users/login | POST | none | email:String, password:String | login user


### list of `products` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/products | GET | none | - | show all products
/products | POST | token | name:String, productimage: String, price:Number, qty:Number, UserId: ObjectId| create new product
/products/:id | GET | token | req.headers.id | get detail product
/products/:id | DELETE | token | - | delete products
/products/new | GET | none | - | Get list of new product



### list of `carts` routes

Route | HTTP | Headers(s) | Body | Description
------ | ------ | -------| ------- | -----------
/carts | GET | token | - | get users cart
/carts | POST | token | ProductId:ObjectId, qty : Number, totalPrice:Number, UserId: ObjectId| create new product
/carts/:id | DELETE | token | req.params.id | delete product in cart
