# e-commerce

## Routes:
| Route                                           | HTTP    | Headers(s) | Body      | Description                         
| ------                                          | ----    | ---------- | ----      | -------------------                 
| http://localhost:3000/api/users/register        | POST    | none       | register  | register manually (input from body) 
| http://localhost:3000/api/users/login           | POST    | none       | login     | login by email and password         
| http://localhost:3000/api/users/login/google    | POST    | none       | login     | register/login using google         
| http://localhost:3000/api/products/:id          | GET     | token      | None      | get all available product
| http://localhost:3000/api/products/             | POST    | token      | product   | create a product
| http://localhost:3000/api/products/:id          | DELETE  | token      | None      | delete a product
| http://localhost:3000/api/products/:id          | PATCH   | token      | none      | edit a product
| http://localhost:3000/api/carts/:id          | POST   | token      | cart      | add product to a cart
| http://localhost:3000/api/carts/:id          | DELETE   | token      | none      | delete specific product from cart