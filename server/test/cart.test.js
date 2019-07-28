const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deleteCart')

let token
let productId
let userId
let cartId
let products


chai.use(chaiHttp)
const expect = chai.expect

// after(function(done) {
//   deleteAll(done)
// });

describe('CART CRUD', function() {
  describe('POST CART', function() {
    it('should send an object with status code 201', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({username: 'tommysutjipto', email: 'tommy_sutjipto96@gmail.com', password: '12345',role: 'admin'})
        .then(function(res) {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          // console.log(res.body, 'iniiii res.body')
          expect(res.body).to.have.property('username')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body).to.have.property('role')
          // expect(res.body.username).to.equal('nihaoma');
          // expect(res.body.email).to.equal('tommysutjipto96@gmail.com');
          // expect(res.body.password).to.equal('12345')
          expect(res.body.role).to.equal('admin')
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    it('successfully logged in', function(done) {
      chai
        .request(app)
        .post('/api/users/login')
        .send({email: 'tommy_sutjipto96@gmail.com', password: '12345'})
        .then(function(res) {
          console.log(res.body, 'ini body user cart')
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).has.property('token')
          token = res.body.token
          userId = res.body.id
          expect(res.body).has.property('username')
          expect(res.body).has.property('email')
          // expect(res.body.email).to.equal('tom@mail.com')
          done()
        })
        .catch((err) => {
          // console.log(err)
        })
    })
    it('should send a status code of 201 and successfully created a shoes', function(done) {
      const input = {
        name: 'Air Jordan',
        description: 'elegance in a shoe',
        price: 200,
        quantity: 50,
        image: 'asdf'
      }
      chai
        .request(app)
        .post('/api/shoes/')
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('quantity')
          productId = res.body._id
          expect(res.body.name).to.equal('Air Jordan')
          expect(res.body.description).to.equal('elegance in a shoe')
          expect(res.body.price).to.equal(200)
          expect(res.body.quantity).to.equal(50)
          done()
        })
        .catch((error) => {
          // console.log(error)
        })
  })
  it('should send an object with status code  201 and successfully created a new cart', function(done) {
    let input = {
      userId: userId,
      productId: productId,
      quantity: 5
    }
    chai
      .request(app)
      .post('/api/carts')
      .set('token',token)
      .send(input)
      .then(function(res) {
        // console.log(token, 'ini tokennya cart')
        // console.log(userId, 'ini userId cart')
        // console.log(productId)
        // console.log(res.body)
        // console.log('========================= haloooo')
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('userId')
        expect(res.body).to.have.property('productId')
        expect(res.body).to.have.property('quantity')
        done()
      })
      .catch(error => {

      })
  })
  it('should send an object with status code  201 and successfully created a new cart', function(done) {
    let input = {
      userId: userId,
      productId: productId,
      quantity: 5
    }
    chai
      .request(app)
      .post('/api/carts')
      .set('token',token)
      .send(input)
      .then(function(res) {
        // console.log(token, 'ini tokennya cart')
        // console.log(userId, 'ini userId cart')
        // console.log(productId)
        // console.log(res.body)
        // console.log('========================= haloooo')
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        cartId = res.body._id

        expect(res.body).to.have.property('userId')
        expect(res.body).to.have.property('productId')
        expect(res.body).to.have.property('quantity')
        done()
      })
      .catch(error => {
        
      })
  })
  it('should send an object with status code  400 and userId is required', function(done) {
    let input = {
      // userId: userId,
      productId: productId,
      quantity: 5
    }
    chai
      .request(app)
      .post('/api/carts')
      .set('token',token)
      .send(input)
      .then(function(res) {
        // console.log(token, 'ini tokennya cart')
        // console.log(userId, 'ini userId cart')
        // console.log(productId)
        // console.log(res.body)
        // console.log('========================= haloooo')
        // console.log('ini error user')
        // console.log(res.body)
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        // expect(res.body).to.have.property('userId')
        // expect(res.body).to.have.property('productId')
        // expect(res.body).to.have.property('quantity')
        done()
      })
      .catch(error => {
        console.log(error)
      })
  })
  it('should send an object with status code  400 and userId is required', function(done) {
    let input = {
      // userId: userId,
      productId: productId,
      quantity: 5
    }
    chai
      .request(app)
      .post('/api/carts')
      .set('token',token)
      .send(input)
      .then(function(res) {
        // console.log(token, 'ini tokennya cart')
        // console.log(userId, 'ini userId cart')
        // console.log(productId)
        // console.log(res.body)
        // console.log('========================= haloooo')
        // console.log('ini error user')
        // console.log(res.body)
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        // expect(res.body).to.have.property('userId')
        // expect(res.body).to.have.property('productId')
        // expect(res.body).to.have.property('quantity')
        done()
      })
      .catch(error => {
        console.log(error)
      })
  })
  it('should send an object with status code 200 and found cart', function(done) {
    chai
      .request(app)
      .get(`/api/carts/${userId}`)
      .set('token',token)
      .then(function(res) {
        // console.log(token, 'ini tokennya cart')
        // console.log(userId, 'ini userId cart')
        // console.log(productId)
        // console.log(res.body)
        // console.log('========================= haloooo')
        // console.log('ini error user')
        // console.log(res.body)
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        products = res.body
        done()
      })
      .catch(error => {
        console.log(error)
      })
  })
  it('should send an object with status code 200 and updated a cart', function(done) {
    let input = {
      userId: userId,
      status:false
    }
    let updated = {
      status: true,
      checkoutDate: new Date()
    }
    chai
    .request(app)
    .patch(`/api/carts/checkout`)
    .set('token',token)
    .send(input,updated)
    .then(function(res) {
      // console.log(token, 'ini tokennya cart')
      // console.log(userId, 'ini userId cart')
      // console.log(productId)
      // console.log(res.body)
      // console.log('========================= haloooo')
      // console.log('ini error cart delete')
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body.ok)
      done()
    })
    .catch(error => {
      console.log(error)
    })
  })
  it('should send an object with status code  200 and deleted a cart', function(done) {
    let input = {
      _id :cartId
    }
    chai
      .request(app)
      .delete(`/api/carts/${cartId}`)
      .set('token',token)
      .send(input)
      .then(function(res) {
        // console.log(token, 'ini tokennya cart')
        // console.log(userId, 'ini userId cart')
        // console.log(productId)
        // console.log(res.body)
        // console.log('========================= haloooo')
        // console.log('ini error cart delete')
        // console.log(res.body)
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        // expect(res.body.message)
        // expect(res.body).to.have.property('userId')
        // expect(res.body).to.have.property('productId')
        // expect(res.body).to.have.property('quantity')
        done()
      })
      .catch(error => {
        console.log(error)
      })
  })
})
  describe('TRANSACTION', function() {
    it('should send an object with status code 201 and successfully created a transaction', function(done){
      let input = {
        products: products,
        userId: userId,
        totalPrice: 50000,
        transactionDate: new Date()
      }
      chai
        .request(app)
        .post('/api/transactions')
        .set('token',token)
        .send(input)
        .then(function(res) {
          // console.log(res.body)
          // console.log('==================== ini transactions')
          expect(res).to.have.status(201)
          // console.log(res.body, '====ini apaan yg error')
          expect(res.body).to.be.an('object')
          done()
        })
       .catch(error => {
         console.log(error)
       }) 
    })
    it('should send an object with status code 200 and found a transaction', function(done){
      let input = {
        userId: userId
      }
      chai
        .request(app)
        .get('/api/transactions')
        .set('token',token)
        .send(input)
        .then(function(res) {
          console.log(res.body)
          console.log('==================== ini transactions')
          expect(res).to.have.status(200)
          // console.log(res.body, '====ini apaan yg error')
          expect(res.body).to.be.an('array')
          done()
        })
       .catch(error => {
         console.log(error)
       }) 
    })
  })
})