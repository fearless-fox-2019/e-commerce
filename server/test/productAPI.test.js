const assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect

const app = require('../app');
const chaiHttp = require('chai-http');
const { deleteProduct, deleteUser } = require('../helpers/testing-product');
var id = '';
var token = ''

chai.use(chaiHttp);

after(function() {
  // deleteProduct()
  deleteUser()
})

describe(`Admin Routes`, function() {
  it(`It Should Return an Object with Status Code 201`, function(done) { // Error Karena Butuh ENV Secret Buat JWT
    chai.request(app)
    .post('/users/signup')
    .send({
      fullname: 'admin',
      email : 'admin@admin.com',
      password : 'qwerqwer',
    })
    .then(function(res) {
      expect(res).to.have.status(201)
      expect(res.body).to.have.any.keys('_id', 'fullname', 'email', 'cart', 'updatedAt', 'createdAt', 'password');
      expect(res.body._id).to.be.a('string');
      expect(res.body.fullname).to.be.a('string');
      expect(res.body.cart).to.be.an('array');
      expect(res.body.email).to.be.a('string');
      expect(res.body.updatedAt).to.be.a('string');
      expect(res.body.createdAt).to.be.a('string');
      expect(res.body.password).to.be.a('string');
      done()
    })
    .catch((err) => {
      // console.log(err);
    })
  })
  it(`It Should Return an Object about User: {token, email, fullname}`, function(done) {
    chai.request(app)
    .post('/users/signin')
    .send({
      email: 'admin@admin.com',
      password: 'qwerqwer'
    })
    .then(function(res) {
      expect(res).to.have.status(200)
      expect(res.body).to.have.any.keys('token', 'fullname', 'email');
      expect(res.body.fullname).to.be.a('string');
      expect(res.body.token).to.be.a('string');
      expect(res.body.email).to.be.a('string');
      token = res.body.token
      done()
    })
    .catch((err) => {
      // console.log(err);
    })
  })
})

describe(`Product Routes`, function()  {
  describe(`Create Product | POST | /products/create`, function() {
    it('It Should Create a Product & Send an Object with 201 Status Code', function(done) {
      chai.request(app)
      .post('/products/create-test')
      .send({
        productName : 'Pelangsing Peninggi Berat Badan',
        productDescription : 'Pasti Tinggi Mungkin Langsing',
        quantity : 3,
        price : 100000,
      })
      .then(function(res) {
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res).to.be.json
        id = res.body._id
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it('It Should Send Back the Correct Format', function(done) {
      chai.request(app)
      .post('/products/create-test')
      .send({
        productName : 'Jual Pulsa 100000',
        productDescription : 'Pulsanya KK',
        quantity : '3',
        price : 100000,
      })
      .then(function(res) {
        expect(res.body).to.have.all.keys('_id', 'productName', 'productDescription', 'quantity', 'picture', 'price', 'createdAt', 'updatedAt');
        expect(res.body._id).to.be.a('string');
        expect(res.body.productName).to.be.a('string');
        expect(res.body.productDescription).to.be.a('string');
        expect(res.body.quantity).to.be.a('number');
        expect(res.body.createdAt).to.be.a('string');
        expect(res.body.updatedAt).to.be.a('string');
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
  })
  describe(`Read All Product | GET | /products/all`, function() {
    it('It Should Return An Array of Object', function(done){
      chai.request(app)
      .get('/products/all')
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it('It Should Return The Correct Data Keys with The Correct Value', function(done){
      chai.request(app)
      .get('/products/all')
      .then(function(res) {
        expect(res.body[0]).to.have.all.keys('_id', 'productName', 'productDescription', 'price','quantity' ,'picture' ,'createdAt', 'updatedAt');
        expect(res.body[0]._id).to.be.a('string');
        expect(res.body[0].productName).to.be.a('string');
        expect(res.body[0].productDescription).to.be.a('string');
        expect(res.body[0].quantity).to.be.a('number');
        expect(res.body[0].createdAt).to.be.a('string');
        expect(res.body[0].updatedAt).to.be.a('string');
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
  })
  // describe(`Update Product | PATCH | /products/update`, function() {
  //   it('It Should Send Back an Object with Status Code 200', function(done){
  //     chai.request(app)
  //     .patch(`/products/update/${id}`)
  //     .send({
  //       productName: 'Updated Name'
  //     })
  //     .set('token', token)
  //     .then(function(res) {
  //       console.log(res.body);
  //       expect(res).to.have.status(200)
  //       expect(res.body).to.be.an('object')
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //   })
  // })
  describe(`Delete Product | DELETE | /products/delete`, function() {
    it('It Should Return Deleted Count', function(done){
      chai.request(app)
      .delete(`/products/delete/${id}`)
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
  })
  describe(`Get User Cart | GET | /users/get`, function() {
    it(`It Should Return an Array with Status Code 200`, function(done)  {
      chai.request(app)
      .get('/users/get')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200)
        expect(res.body.cart).to.be.an('array')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
  })
})
describe(`Get User Cart | GET | /users/get`, function() {
  it(`It Should Return an Array with Status Code 200`, function(done)  {
    chai.request(app)
    .get('/users/get')
    .then(function(res) {
      expect(res).to.have.status(500)
      expect(res.body.message).to.equal('Token Not Provided')
      done()
    })
    .catch((err) => {
      // console.log(err);
    })
  })
})
describe(`User Routes`, function() {
  describe(`User Sign Up| POST | /users/signup`, function() {
    it(`It Should Return an Object with Status Code 201`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Carl Johnson',
        email: 'carl@mail.com',
        password: 'qwerqwer'
      })
      .then(function(res) {
        expect(res).to.have.status(201)
        expect(res.body).to.have.all.keys('_id', 'fullname', 'email', 'password','cart' ,'createdAt', 'updatedAt');
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: fullname: Please Fill in Your Name" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: '',
        email: 'carl2@mail.com',
        password: 'qwerqwer'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: fullname: Please Fill in Your Name')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: email: Please Provide Email for Your Account" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Carl Johnson',
        email: '',
        password: 'qwerqwer'
      })
      .then(function(res) {
        // console.log(res.body.message);
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: email: Please Provide Email for Your Account')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: password: Please Provide Password for Your Account" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Carl Johnson',
        email: 'hahaha@mail.com',
        password: ''
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: password: Please Provide Password for Your Account')
        done()
      })
      .catch((err) => {
        console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: fullname: Your Name can only contain Alphabet and Space" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Officer__TempeNyyyy2Die',
        email: 'carl2@mail.com',
        password: 'qwerqwer'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: fullname: Your Name can only contain Alphabet and Space')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: password: Password can Only Contain Alpha Numeric" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Officer Tempeny',
        email: 'carl2@mail.com',
        password: ' dh**w390#2'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: password: Password can Only Contain Alpha Numeric')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: password: Password Must be 8 Characters or More" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Officer Tempeny',
        email: 'carl2@mail.com',
        password: 'cj'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: password: Password Must be 8 Characters or More')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: email: Someone Already Used carl@mail.com as their email" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'Carl Johnson',
        email: 'carl@mail.com',
        password: 'qwerqwer'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: email: Someone Already Used carl@mail.com as their email')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "user validation failed: fullname: Your Name can only contain Alphabet and Space" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: '456r78##$%^',
        email: 'bobo@mail.com',
        password: 'qwerqwer'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: fullname: Your Name can only contain Alphabet and Space')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    }),
    it(`It Should Return an Error Message "password: Password can Only Contain Alpha Numeric" with Status Code 500`, function(done) {
      chai.request(app)
      .post('/users/signup')
      .send({
        fullname: 'ibegg',
        email: 'bobo@mail.com',
        password: 'qwe%^^%rqwer'
      })
      .then(function(res) {
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('user validation failed: password: Password can Only Contain Alpha Numeric')
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
  })
  describe(`User Sign In | POST | /users/signin`, function() {
    it(`It Should Return an Error with a Message "Invalid Username or Password" with Status Code 401`, function(done) {
      chai.request(app)
      .post('/users/signin')
      .send({
        email : 'admin1@admin.mail.com',
        password : 'qwerqwer',
      })
      .then(function(res) {
        expect(res).to.have.status(401)
        expect(res.body).to.have.any.keys('message');
        expect(res.body.message).to.be.a('string');
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
    it(`It Should Return an Error with a Message "Invalid Username or Password" with Status Code 401`, function(done) {
      chai.request(app)
      .post('/users/signin')
      .send({
        email : 'admin1admin%72.mail.com',
        password : 'qwerqwer',
      })
      .then(function(res) {
        expect(res).to.have.status(401)
        expect(res.body).to.have.any.keys('message');
        expect(res.body.message).to.be.a('string');
        done()
      })
      .catch((err) => {
        // console.log(err);
      })
    })
  })
})