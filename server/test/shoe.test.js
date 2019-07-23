const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deleteShoe')


chai.use(chaiHttp)
const expect = chai.expect

after(function(done) {
  deleteAll(done)
});

describe('Shoes CRUD', function() {
  describe('POST shoes/addShoes', function() {
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
        .post('/api/shoes/create')
        .send(input)
        .then(function(res) {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('quantity')
          expect(res.body.name).to.equal('Air Jordan')
          expect(res.body.description).to.equal('elegance in a shoe')
          expect(res.body.price).to.equal(200)
          expect(res.body.quantity).to.equal(50)
          done()
        })
        .catch((error) => {
          console.log(error)
        }) 
    })
    it('should send an error status code of 400 and name is required', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 200,
        quantity: 50
      }
      chai
        .request(app)
        .post('/api/shoes/create')
        .send(input)
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message).to.equal('Error: name is required')
          done()
        })
        .catch((error) => {
          console.log(error)
        }) 
    })
    it('should send an error status code of 400 and description is required', function(done) {
      const input = {
        name: 'asdf',
        price: 200,
        quantity: 50
      }
      chai
        .request(app)
        .post('/api/shoes/create')
        .send(input)
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message).to.equal('Error: description is required')
          done()
        })
        .catch((error) => {
          console.log(error)
        }) 
    })
    it('should send an error status code of 400 and price is required', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 'k',
        quantity: 50
      }
      chai
        .request(app)
        .post('/api/shoes/create')
        .send(input)
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message).to.equal('Error: price is required')
          done()
        })
        .catch((error) => {
          console.log(error)
        }) 
    })
    it('should send an error status code of 400 and quantity is required', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 200,
        quantity: 50
      }
      chai
        .request(app)
        .post('/api/shoes/create')
        .send(input)
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch((error) => {
          console.log(error)
        }) 
    })
  })
})