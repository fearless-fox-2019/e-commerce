const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deletePlayers')

chai.use(chaiHttp)

after(function(done) {
  deleteAll(done)
});

describe('User Login/Register', function(){
  describe('POST /users/register', function() {
    it('should send an object with status code 201', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({username: 'nihaoma', email: 'tommysutjipto96@gmail.com', password: '12345',role: 'admin'})
        .then(function(res) {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          console.log(res.body, 'iniiii res.body')
          expect(res.body).to.have.property('username')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body).to.have.property('role')
          expect(res.body.username).to.equal('nihaoma');
          expect(res.body.email).to.equal('tommysutjipto96@gmail.com');
          // expect(res.body.password).to.equal('12345')
          expect(res.body.role).to.equal('admin')
          done()
        })
        .catch((err) => {
          console.log(err)
        })

    })
    it('should send a validation format email is wrong', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({username: 'ehehehe', email: 'tomz.adf.com', password: '12345', role: 'user'})
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.equal(`Error: tomz.adf.com is not a valid email!`)
          // expect(res.body).to.have.property('email')
          // console.log(res.body.message, 'asdkjasdlads')
          // console.log(res.message, 'ajskdjasldasd')
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    it('should send a validation email has been used', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({username: 'nyehahaha', email: 'tommysutjipto96@gmail.com', password: '12345', role: 'admin'})
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          // console.log(res.body.message, 'asd')
          expect(res.body.message).to.equal(`Error: tommysutjipto96@gmail.com has been used...`)
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    it('should send username has been used', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({username: 'nihaoma', email: 'lolo@mail.com', password: '12345',role: 'admin'})
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          // console.log(res.body.message, 'asd')
          expect(res.body.message).to.equal(`Error: username nihaoma has been used`)
          done()
        })
        .catch((err) => {
          console.log(err);
        })
    })
    it('should return username is required', function(done) {
      chai
        .request(app)
        .post('/api/users/register')
        .send({email: 'hahaha@mail.com', password: '12345', role: 'admin'})
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          console.log(res.body.message, 'hei hei')
          expect(res.body.message).to.equal(`Error: Username is required`)
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    it('should return email is required', function(done) {
      chai
      .request(app)
      .post('/api/users/register')
      .send({username: 'asdfasfadsf', password: '12345', role: 'admin'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        console.log(res.body.message, 'hei hei')
        expect(res.body.message).to.equal(`Error: Email is required`)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
    it('should return password is required', function(done) {
      chai
      .request(app)
      .post('/api/users/register')
      .send({email: 'tom@mail.com', username: 'adslkfjasfd' , role: 'admin'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        console.log(res.body.message, 'hei hei')
        expect(res.body.message).to.equal(`Error: Password is required`)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
    it('should return role is required', function(done) {
      chai
      .request(app)
      .post('/api/users/register')
      .send({email: 'tommy@mail.com', username: 'asdasds' , password: '123123'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        console.log(res.body.message, 'hei hei')
        expect(res.body.message).to.equal(`Error: role is required`)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
    it('should role must be either admin or user', function(done) {
      chai
      .request(app)
      .post('/api/users/register')
      .send({email: 'tom@mail.com', username: 'adslkfjasfd' , role: 'zz', password: '12345'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        console.log(res.body.message, 'hei hei')
        expect(res.body.message).to.equal(`Error: role must be either admin or user`)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
  })
  describe('POST /users/login', function() {
    it('successfully logged in', function(done) {
      chai
        .request(app)
        .post('/api/users/login')
        .send({email: 'tom@mail.com', password: '12345'})
        .then(function(res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).has.property('token')
          expect(res.body).has.property('username')
          expect(res.body).has.property('email')
          expect(res.body.email).to.equal('tom@mail.com')
          done()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    it('should return status 404 of not found', function(done) {
      chai
      .request(app)
      .post('/api/users/login')
      .send()
      .then(function(res) {
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('not found')
        
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
    it('should return email/password is wrong', function(done) {
      chai
      .request(app)
      .post('/api/users/login')
      .send({email: '', password: '1235'})
      .then(function(res) {
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('not found')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
    it('should return email/password is wrong', function(done) {
      chai
      .request(app)
      .post('/api/users/login')
      .send({email: 'asd@mail.com', password: ''})
      .then(function(res) {
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('not found')
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
  })

})

const expect = chai.expect