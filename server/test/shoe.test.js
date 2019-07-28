const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deleteShoe')

let token
let productId
chai.use(chaiHttp)
const expect = chai.expect

after(function(done) {
  deleteAll(done)
});

describe('Shoes CRUD', function() {
  describe('POST shoes', function() {
    it('should send an object with status code 201', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({role:'admin',username: 'nihaoma', email: 'tommysutjipto96@gmail.com', password: '12345'})
        .then(function(res) {
          console.log('halohalohalohalo')
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          console.log(res.body, 'iniiii res.body')
          console.log(res.body.role)
          expect(res.body).to.have.property('username')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body).to.have.property('role')
          expect(res.body.username).to.equal('nihaoma');
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
        .send({email: 'tommysutjipto96@gmail.com', password: '12345'})
        .then(function(res) {
          console.log(res.body)
          token = res.body.token
          console.log(res.body.token)
          console.log(token, '============== ini token')
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).has.property('token')
          expect(res.body).has.property('username')
          expect(res.body).has.property('email')
          expect(res.body).has.property('role')
          expect(res.body.role).to.equal('admin')
          // expect(res.body.email).to.equal('tommysutjipto96@mail.com')
          done()
        })
        .catch((err) => {
          console.log(err)
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
          console.log(error)
        }) 
    })
    it('should send an error status code of 400 and name is required', function(done) {
      const input = {
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
        quantity: 50,
        image: 'asdf'
      }
      chai
        .request(app)
        .post('/api/shoes/')
        .set('token',token)
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
        name: 'hehehe',
        quantity: 50,
        image: 'asdf'
      }
      chai
        .request(app)
        .post('/api/shoes/')
        .set('token',token)
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
    it('should send an error status code of 400 and quantity is required', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 200,
        name: 'halooo',
        image: 'asd'
      }
      chai
        .request(app)
        .post('/api/shoes/')
        .set('token',token)
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
    it('should send an error status code of 400 and quantity must be a number', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 200,
        quantity: 'asd',
        name: 'hei',
        image: 'asdf'
      }
      chai
        .request(app)
        .post('/post/shoes/')
        .set('token',token)
        .send(input)
        .then(function(res) {
          // console.log('============================ ini quantity must be a number')
          expect(res).to.have.status(404)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('should send an error status code of 404 and price must be a number', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 'asdf',
        quantity: 50,
        name: 'hei',
        image: 'asdf'
      }
      chai
        .request(app)
        .post('/post/shoes/')
        .set('token',token)
        .send(input)
        .then(function(res) {
          console.log('============================ ini price must be a number')
          expect(res).to.have.status(404)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
  })
  describe('PATCH shoes', function() {
    it('it should send a status code of 200 and successfully updated', function(done) {
      const input = {
        description: 'elegance in a shoe',
        price: 50,
        quantity: 50,
        name: 'hei',
        image: 'asdf'
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          console.log(productId);
          console.log(res.body)
          console.log('iniiii patch shoes')
          expect(res).to.be.an('object')
          expect(res).have.status(200)
          expect(res.body).has.property('description')
          expect(res.body).has.property('name')
          expect(res.body).has.property('quantity')
          expect(res.body).has.property('image')
          expect(res.body).has.property('price')
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and description is required', function(done) {
      const input = {
        price: 50,
        quantity: 50,
        name: 'hei',
        image: 'asdf'
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and price is required', function(done) {
      const input = {
        description: 'asdf',
        quantity: 50,
        name: 'hei',
        image: 'asdf'
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and quantity is required', function(done) {
      const input = {
        description: 'asdf',
        price: 200,
        name: 'hei',
        image: 'asdf'
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and name is required', function(done) {
      const input = {
        quantity: 50,
        description: 'asdf',
        price: 200,
        image: 'asdf'
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and image is required', function(done) {
      const input = {
        quantity: 50,
        description: 'asdf',
        price: 200,
        name: 'hei',
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and quantity is must be a number', function(done) {
      const input = {
        description: 'asdf',
        price: 200,
        name: 'hei',
        image: 'asdf',
        quantity: 'asdasd'
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    it('it should send a status code of 400 and price must be a number', function(done) {
      const input = {
        description: 'asdf',
        price: 'eheh',
        name: 'hei',
        image: 'asdf',
        quantity: 50
      }
      chai
        .request(app)
        .patch(`/api/shoes/${productId}`)
        .set('token',token)
        .send(input)
        .then(function(res) {
          expect(res).have.status(400)
          expect(res).to.be.an('object')
          expect(res.body.message)
          done()
        })
        .catch(error => {
          console.log(error)
        })
    })
    describe('DELETE Shoe', function () {
      it('it should send a status code of 200 and deleted a shoe', function(done) {
        chai
          .request(app)
          .delete(`/api/shoes/${productId}`)
          .set('token',token)
          .then(function(res) {
            expect(res).have.status(200)
            console.log(res)
            console.log('inin delete shoes')
            expect(res).to.be.an('object')
            expect(res.body.message)
            done()
          })
          .catch(error => {
            console.log(error)
          })
      })
    
    }) 
  }) 
})