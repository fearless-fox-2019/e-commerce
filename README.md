# e-commerce
# rest-api-documentation-e-commerce


| Route |   HTTP |   Header |   Body |   Response |   Description |   Validation |
|---|---|---|---|---|---|---|
| /user/register | POST | - | {email, fullName, password} | {_id, email, fullName, password} | register a user | email must be valid, name is more than 1 char |
| /user/login |  POST |  -|  {email, password} |  {access_token} |  login: get token |  - |
| /product |  POST |  token |  {name, price, image, description} |  {name, price, image, description, _id} |  create a new product |  - |
| /product/:id |  DELTETE |  token |  	{_id} |  delete a product |  -|