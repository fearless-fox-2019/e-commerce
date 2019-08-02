# e-commerce 🌎
# GEMS 💎
E-Commerce jualan boneka 🐼🦊🦁🐯🐨🐳🐙🦋
[![standard-readme compliant](https://img.shields.io/badge/Link%20deploy-eCommerce-brightgreen.svg?style=flat-square)](https://ecommerce.indinabilah.me)

Getting Startted

```
cd server 
npm i
npm run dev
```

```
cd client
npm i
npm run serve
```

`baseUrl` :
- server
```
http://localhost:3000
```

- client
```
http://localhost:8080
```

`masuk sebagai admin di client` :
- register username dengan nama "indi"


### List of basic routes


### User

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /users | GET | none | none | get all users |
| /users/register | POST | none | username:STRING, email:STRING(valid email), password:STRING | register user |
| /users/login | POST | none | email:STRING, password:STRING | user login |

### Product

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /products | GET | none | none | get all product |
| /products | POST | token | productname:STRING, price:NUMBER, stock:NUMBER | register product by admin|
| /products/:id | PATCH | token | productname:STRING, price:NUMBER, stock:NUMBER | update product |
| /products/:id | DELETE | token | id product | delete product

### Cart

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /carts | GET | token | none | get all carts |
| /carts | POST | token | productname:STRING, qty:NUMBER | add to cart (user)|


### Import Product to DB
```
{"_id":{"$oid":"5d3c7569a7267744ce59eaa9"},"productname":"cobain image","price":{"$numberInt":"1000"},"stock":{"$numberInt":"12"},"image":"https://storage.googleapis.com/photoecom/156424329375535.png","category":"food","description":"cobain upload image","createdAt":{"$date":{"$numberLong":"1564243305108"}},"updatedAt":{"$date":{"$numberLong":"1564243305108"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d70f650b67349e6f3ba7b"},"productname":"Cat Doll","price":{"$numberInt":"25000"},"stock":{"$numberInt":"12"},"image":"https://storage.googleapis.com/photoecom/1564307701071kucingputih.jpg","category":"cat","description":"Boneka kucing ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307702195"}},"updatedAt":{"$date":{"$numberLong":"1564307702195"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d710f50b67349e6f3ba7c"},"productname":"Cat Doll 2","price":{"$numberInt":"25000"},"stock":{"$numberInt":"12"},"image":"https://storage.googleapis.com/photoecom/1564307726178kucingbesar.jpg","category":"cat","description":"Boneka kucing ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307727064"}},"updatedAt":{"$date":{"$numberLong":"1564307727064"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d712950b67349e6f3ba7d"},"productname":"Marrie Cat","price":{"$numberInt":"75000"},"stock":{"$numberInt":"12"},"image":"https://storage.googleapis.com/photoecom/1564307752629marriecat.jpg","category":"cat","description":"Boneka kucing ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307753411"}},"updatedAt":{"$date":{"$numberLong":"1564307753411"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d714350b67349e6f3ba7e"},"productname":"Mickey Mouse","price":{"$numberInt":"75000"},"stock":{"$numberInt":"12"},"image":"https://storage.googleapis.com/photoecom/1564307778764mickey.jpeg","category":"disney","description":"Boneka kucing ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307779600"}},"updatedAt":{"$date":{"$numberLong":"1564307779600"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d715d50b67349e6f3ba7f"},"productname":"Winnie The Pooh","price":{"$numberInt":"75000"},"stock":{"$numberInt":"10"},"image":"https://storage.googleapis.com/photoecom/1564307804349winniedisney.jpg","category":"disney","description":"Boneka kucing ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307805318"}},"updatedAt":{"$date":{"$numberLong":"1564307805318"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d718650b67349e6f3ba80"},"productname":"Mini Disney","price":{"$numberInt":"50000"},"stock":{"$numberInt":"100"},"image":"https://storage.googleapis.com/photoecom/1564307845564minidisney.jpg","category":"disney","description":"Boneka kucing ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307846479"}},"updatedAt":{"$date":{"$numberLong":"1564307846479"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d71c850b67349e6f3ba81"},"productname":"Boneka DOTS","price":{"$numberInt":"950000"},"stock":{"$numberInt":"5"},"image":"https://storage.googleapis.com/photoecom/1564307911368bonekadots.jpg","category":"line","description":"Boneka Descendants Of The Sun ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307912198"}},"updatedAt":{"$date":{"$numberLong":"1564307912198"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d71e650b67349e6f3ba82"},"productname":"Line Doll","price":{"$numberInt":"50000"},"stock":{"$numberInt":"8"},"image":"https://storage.googleapis.com/photoecom/1564307941770line.jpg","category":"line","description":"Boneka Official line ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307942619"}},"updatedAt":{"$date":{"$numberLong":"1564307942619"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d721950b67349e6f3ba83"},"productname":"Boneka Pink","price":{"$numberInt":"60000"},"stock":{"$numberInt":"8"},"image":"https://storage.googleapis.com/photoecom/1564307992887pink.jpg","category":"random","description":"Boneka Official GEMS ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564307993692"}},"updatedAt":{"$date":{"$numberLong":"1564307993692"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3d723950b67349e6f3ba84"},"productname":"Poke Doll","price":{"$numberInt":"105000"},"stock":{"$numberInt":"8"},"image":"https://storage.googleapis.com/photoecom/1564308024831pokemon.jpg","category":"pokemon","description":"Boneka Official GEMS ... berbahan halus dengan isian dacron premium","createdAt":{"$date":{"$numberLong":"1564308025640"}},"updatedAt":{"$date":{"$numberLong":"1564308025640"}},"__v":{"$numberInt":"0"}}
{"_id":{"$oid":"5d3da3bf50b67349e6f3ba8b"},"productname":"Hello Kitty","price":{"$numberInt":"120000"},"stock":{"$numberInt":"1"},"image":"https://storage.googleapis.com/photoecom/1564320692867hello kitty legend.jpg","category":"random","description":"Hello Kitty Family","createdAt":{"$date":{"$numberLong":"1564320703565"}},"updatedAt":{"$date":{"$numberLong":"1564320703565"}},"__v":{"$numberInt":"0"}}

```