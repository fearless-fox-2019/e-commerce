# E-Commerce
## Feature
- Product
	- Add
	- Find All + Filter
	- Find
	- Replace
	- Update
	- Delete
- Cart
	- Add
	- Find All
	- Update
	- Delete
- User
	- Register
	- Login
	- Logout
	- Sign In with 3rd API
## HTTP Methods
### Products
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/products|GET|-|-| **Code:** 200 <br>**Content:** <br> [ { productName: "T-shirt", description: ... ,price: 40000, stock: 30, category:[outfit, men]}, ... ] |**Code:** 404<br> **Content:** { error : "Products doesn't exist" } |
|/api/products|GET|:productId|-| **Code:** 200 <br> **Content:**<br> { productName: "T-shirt", description: ... ,price: 40000, stock: 30, category:[outfit, men]} |**Code:** 404<br>**Content:** { error : "Product doesn't exist" } |
|/api/products|POST|-|data: Object| **Code:** 201 <br> **Content:**<br> { productName: "T-shirt", description: ... ,price: 40000, stock: 30, category:[outfit, men]} |**Code:** 404<br>**Content:** { error: "Can't add product" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/products|PUT|:productId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { productName: "T-shirt", description: ... ,price: 40000, stock: 30, category:[outfit, men]}  |**Code:** 404<br>**Content:** { error: "Can't replace product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." } |
|/api/products|PATCH|:productId|id: String, data: Object| **Code:** 200<br>**Content:**<br> { productName: "T-shirt", description: ... ,price: 40000, **_stock: 30_**, category:[outfit, men]}  |**Code:** 404<br>**Content:** { error: "Can't update product" }<br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|
|/api/products|DELETE|:productId|id: String| **Code:** 200<br>**Content:**<br>{ message: Item has been deleted } |**Code:** 404<br>**Content:** { error: "Product doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }|

### Carts
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/carts|GET|-|-| **Code:** 200<br>**Content:**{userId: e83e3g2e32yeh328eh, data: [{productsId, count}, {productsId, count}, ... ]} |**Code:** 404<br>**Content:** { error: "Cart doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }| |
|/api/carts|POST|-|item: Object| **Code:** 201<br>**Content:** {productsName: "T-shirt", count: 2 } |**Code:** 404<br>**Content:** { error: "Item doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }||
|/api/carts|PATCH|:cartId|item: Object| **Code:** 200<br>**Content:** {productsName: "T-shirt", **count: 3** } |**Code:** 404<br>**Content:** { error: "Item doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }| |
|/api/carts|DELETE|:cartId|item: Object| **Code:** 200<br>**Content:** { message: "Item has been deleted" }|**Code:** 404<br>**Content:** { error: "Item doesn't exist" } <br> or <br> **Code:** 401<br>**Content:** <br> { error : "You are unauthorized to make this request." }| |

### Users
|URL|Method|URL Params|Data|Success|Error|
|---|------|----------|-----------|-------|-----|
|/api/users/signin|POST|-|email: String, password: String| **Code:** 200<br>**Content:** <br> {token: "3821739218fewfer32rf2", username:"Aditya" }|**Code:** 400<br> **Content:** { error: "Wrong Email or Password "}  |
|/api/users/signin/google|POST|-|-| **Code:** 200<br>**Content:** {token: "3821739218fewfer32rf2", username:"Aditya Pradana" |**Code:** 400 <br>**Content:** { error: "Bad request" } |
|/api/users/signup|POST|-|username: String, email: String, password: String| **Code:** 201<br>**Content:** { message: "User has been registerd" } |**Code:** 400 <br> **Content:** { error: "Bad request}  |

