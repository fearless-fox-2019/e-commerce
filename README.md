##E-Commerce 

> **Base Url** : http://localhost:3000

## Routes

### User

1. **Routes**

| Routes               | Method   | Body                                                         | Returns                      | Descriptions                                                 |
| -------------------- | -------- | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| **users/signin**     | `POST`   | ` { email : 'bagasputro.irshadi@gmail.com', password :  'qwerqwer'}` | `{ token }`                  | Sign In                                                      |
| **users/signup**     | `POST`   | ` { fullname : 'Irshadi Bagasputro', 'bagasputro.irshadi@gmail.com', password :  'qwerqwer'}` | `{ token, fullname,  email}` | Sign Up                                                      |
| **users/all**        | `GET`    |                                                              | `[ { users }. ]`             | Get All Registered User                                      |
| **users/add/:id**    | `PATCH`  | `{ product: { _id: 562738, productName, productDescription, quantity, price }}` | `None`                       | Add To Cart, Send an Object to Be pushed in the User Cart DB \| This Operations **require token** |
| **users/remove/:id** | `DELETE` | `{ id: id }`                                                 | `None`                       | Remove From Cart, Send an. Object that Contains Product ID. It will. be pulled from the User Cart in the DB. \| This Operations **require token** |
| **users/get**        | `GET`    |                                                              | `[ { _id: id }]`             | Get User Cart. It Will return an Array of Object that contain id for every products that the user had picked before. This Operations **require token** |

###User Validation

Fullname : Required, Only Letters and Space are Allowed

Password: Required, Min: 8 Character, Only AlphaNumeric, and Symbols ('-', '_') are Allowed

Emai l: Required

### Products

1. **Routes**

| Routes                   | Method   | Body                                                         | Returns               | Descriptions                                                 |
| ------------------------ | -------- | ------------------------------------------------------------ | --------------------- | ------------------------------------------------------------ |
| **/products/all**        | `GET`    | `none`                                                       | `[ { products} ]`     | Upon fire, it will return an array of object that contain Every Available Products in the Database |
| **/products/create**     | `POST`   | `{ productName: String, productDescription: String, quantity: Number, price: Number, file: File }` **All Field is Required** | ` { createdProduct }` | Create a Product in the Database. This Operation Contains **Auhtentication** and **Authorization**. Only **Admin** is Allowed to Perform this Operation |
| **/products/delete/:id** | `DELETE` | `none`                                                       | `none`                | Delete a Product in the Database. This Operation Contains **Auhtentication** and **Authorization**. Only **Admin** is Allowed to Perform this Operation |
| **/products/update/:id** | `PATCH`  | { productName: String, productDescription: String, quantity: Number, price: Number, file: File } | `{ updatedProduct }`  | Update a Product in the Database. This Operation Contains **Auhtentication** and **Authorization**. Only **Admin** is Allowed to Perform this Operation |

## Features

- Admin Page : 

  - Credentials :

    fullname : admin

    email : admin@admin.com

    password : qwerqwer

- Nested Routes

- Add To Cart

- Navigation Guard For Admin Page (/admin) can be accessed by admin account only

