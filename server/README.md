# e-commerce


## Geting Started
- npm init
- npm install
- Run `nodemon app.js or npm run dev` to start the server.
- Run `npm run serve` to start the client

## Feature
- Register
- Login
- Add Item
- Update Item
- Delete Item
- View Detail Item
- Add to Cart
- Checkout


## Routes
### User Route
#### Register

    URL: /users/register
    Method: POST
    Headers: none
    params: none
    body: {name: String, email: String, password: String}
    Success Response: 
        Code 201:
            {
                "role": "customer",
                "_id": "5d36a106f7621719b7c8062b",
                "name": "mei",
                "email": "mei@mail.com",
                "password": "$2b$10$cK/r0frmYVswQhn8tJP7Feq2Lp7Dsce/ijHun/n1ic7bg73OC/BUe",
                "__v": 0
            }
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Login

    URL: /users/login
    Method: POST
    Headers: none
    params: none
    body: {email: String, password: String}
    Success Response: 
        Code 200:
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZhMTA2Zjc2MjE3MTliN2M4MDYyYiIsImVtYWlsIjoibWVpQG1haWwuY29tIiwibmFtZSI6Im1laSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU2Mzg2MTI5MSwiZXhwIjoxNTYzODY0ODkxfQ.cMIQnkPMPSnrSoFP0U32kSD15NpgII7plor05RFf3AU",
                "userId": "5d36a106f7621719b7c8062b",
                "name": "mei",
                "role": "customer"
            }
    Error Response:
        Code 404:
        Content: {message: 'Wrong Email/Password}


### Item Route

#### Create Item

    URL: /items
    Method: POST
    Headers: token
    Authenticate : YES
    Authorize Admin: YES
    params: none
    body: {name: String, category: String, description: String, image:String, price: Number, stock: Number, owner: ObjectId}
    Success Response: 
        Code 201:
           {
                "_id": "5d369f03328da118d6968045",
                "name": "Black Cheesecake",
                "category": "Cheesecake",
                "description": "chesecake dengan warna hitam ",
                "image": "https://storage.googleapis.com/hacktiv-image/1563860737384BLACK-CHEESE-WEB-compressor.jpg",
                "price": 250000,
                "stock": 5,
                "__v": 0
            }
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Get All Items

    URL: /items
    Method: GET
    Headers: none
    params: none
    body: none
    Success Response: 
        Code 200:
           [
                {
                    "_id": "5d369f03328da118d6968045",
                    "name": "Black Cheesecake",
                    "category": "Cheesecake",
                    "description": "chesecake dengan warna hitam ",
                    "image": "https://storage.googleapis.com/hacktiv-image/1563860737384BLACK-CHEESE-WEB-compressor.jpg",
                    "price": 250000,
                    "stock": 5,
                    "__v": 0
                },
                {
                    "_id": "5d36a7def7621719b7c8062c",
                    "name": "Blackforest",
                    "category": "Chocolate Cake",
                    "description": "blackforest dengan cokelat hitam dan cherry ",
                    "image": "https://storage.googleapis.com/hacktiv-image/1563863002058blackforest.png",
                    "price": 270000,
                    "stock": 10,
                    "__v": 0
                },
                ......
           ]
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Get Details Item

    URL: /items/:id
    Method: GET
    Headers: token
    params: itemId
    Authenticate : YES
    body: none
    Success Response: 
        Code 200:
            {
                "_id": "5d36a7def7621719b7c8062c",
                "name": "Blackforest",
                "category": "Chocolate Cake",
                "description": "blackforest dengan cokelat hitam dan cherry ",
                "image": "https://storage.googleapis.com/hacktiv-image/1563863002058blackforest.png",
                "price": 270000,
                "stock": 10,
                "__v": 0
            }
    Error Response:
        Code 500:
        Content: {message: <error message>}

#### Update Data Item

    URL: /items/:id
    Method: PUT
    Headers: token-Admin
    params: itemId
    Authenticate : YES
    Authorization Admin: YES
    body: {all field can be updated}
    Success Response: 
        Code 200:
            {
                "_id": "5d369f03328da118d6968045",
                "name": "Black Cheesecake",
                "category": "Cheesecake",
                "description": "chaseecake black sakura",
                "image": "https://storage.googleapis.com/hacktiv-image/1563860737384BLACK-CHEESE-WEB-compressor.jpg",
                "price": 250000,
                "stock": 5,
                "__v": 0
            }
    Error Response:
        Code: 404
        Content: {message: 'Item Not Found!'}
        Code 500:
        Content: {message: <error message>}

#### Update Stock Item

    URL: /items/:id
    Method: PATCH
    Headers: token
    params: itemId
    Authenticate : YES
    Authorization: NO
    body: {amount: Number}
    Success Response: 
        Code 200:
            {
                "_id": "5d369f03328da118d6968045",
                "name": "Black Cheesecake",
                "category": "Cheesecake",
                "description": "chaseecake black sakura",
                "image": "https://storage.googleapis.com/hacktiv-image/1563860737384BLACK-CHEESE-WEB-compressor.jpg",
                "price": 250000,
                "stock": 3,
                "__v": 0
            }
    Error Response:
        Code 404:
        Content: {message: 'Item Not Found!'}
        Code 500:
        Content: {message: <error message>}

#### Delete Item

    URL: /items/:id
    Method: DELETE
    Headers: token
    params: itemId
    Authenticate : YES
    Authorization: YES
    body: none
    Success Response: 
        Code 200:
            {
                "_id":"5d10ac4549ae974089eda01b",
                "name":"laptop",
                "image":"https://id-test-11.slatic.net/original/1a41141c912c0b5e8eb635b76e4da43a.jpg",
                "price":8000000,
                "stock":2,
                "owner":"5d10a8fb6776a53e8f8f12ed",
                "__v":0
            }
    Error Response:
        Code 500:
        Content: {message: <error message>}

### Cart Route

### Transaction Route