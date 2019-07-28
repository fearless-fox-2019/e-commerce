# e-commerce
# mini-wp

#### MINI-WP built Express and Monggose in server.

### User

Routes | HTTP | Body | Description | Error Response  | 
------ | ---- | ---- | ----------- | -----------
/api/users/signup | POST | username:String, email:String, password:String | Register new user | username is empty 400, email is empty 400, password is empty 400
/api/users/signin | POST | username:String,password:String | Logging in user | username/password invalid 401
/api/users/signin/google | POST | google account | Logging in user with google account
/api/users/confirmaton/:token | GET | token and email user | Confirmation email verification


### Product

Routes | HTTP | Body | Description | Error Response  | Middlewares
------ | ----- | ----- | -------- | -------- | ---
/api/products | GET | none | Show the products | none | 
/api/products/:id | GET | none | Get a single product info | none |  
/api/products | POST | name:String, description:String image:String stock:number color:string price:number, size:string| Create new product | error 400 on name,description,image,price,color,size, and 401 login | Login Authenthication
/api/products/:id | DELETE | none | Delete by id | none |  Login Authentication & Authorization by owner only
/api/products/stock/:id | POST | user stock | decrease stock | 401 login, 401 out of stock |  Login Authentication 
/api/products/:id | PUT | input new updated data | Edit your list (will change the whole data) |  error 401 on name,description,image,price,color,size, login |  Login Authentication & Authorization by owner only
/api/products/:id | PATCH | input new updated data | Edit your list (only change the updated key)| none |  Login Authentication & Authorization by owner only
/api/upload | PATCH | upload image to google cloud | image form data  | none|  Login Authentication

### Cart

Routes | HTTP | Body | Description | Error Response  | Middlewares
------ | ----- | ----- | -------- | -------- | ---
/api/carts | GET | none | Show the products user pick | none | Login Authentifhication
/api/carts | POST | productCart:String, selectedSize:String | Create new cart |selected size err 400, login please 401 | Login Authenthication
/api/carts/:id | DELETE | none | Delete by id | login please 401, authorization 404 |  Login Authentication & Authorization by owner only


## Usage
 Make sure you have Node.js and npm installed in your computer, and then run these commands:
 ```
 $ npm install
 $ nodemon app.js
 ```

 Access the Web via http://e-commerce.muhrezbas.xyz

