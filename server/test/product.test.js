const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app');
const deleteAll = require('../helpers/deleteAll')

chai.use(chaiHttp);

const expect = chai.expect

after(function(done) {
  deleteAll(done)
});

// describe 'CREATE'
// it('')

describe('User Login/Register', function() {  

  describe('Success POST /user', function() {
    describe('success register', function() {
      it('should send an object with 201 status code', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name: 'nino', email : 'nino@mail.com', password : '123456' })
        .then(function(res) {  
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          expect(res.body.name).to.equal('nino');
          expect(res.body.email).to.equal('nino@mail.com');
          expect(res.body.password).to.equal('123456');
          done();
        })
        .catch(err=> {
          console.log(err)
        })
      })
      it('success login user', function(done) {        
        chai
        .request(app)
        .post('/users/login')
        .send({ email : 'nino@mail.com', password : '123456' })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          expect(res.body.email).to.equal('nino@mail.com');
          expect(res.body.password).to.equal('123456');
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })    
    })
    describe('fail POST /user', function() {
      it('validate email format', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name: 'nino', email : 'ninomail.com', password : '123456' })
        .then(function(res) {
          expect(res.body.message).to.have.string('email format wrong!')
          expect(res).to.have.status(400)
          done()
        })
        .catch(err=> {
          console.log(err)
        })
      })
      it('validate required name value', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ email : 'ninomail.com', password : '123456' })
        .then(function(res) {
          expect(res.body.message).to.have.string('')      
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('validate required email value', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name : 'shandi', password : '123456' })
        .then(function(res) {
          expect(res.body.message).to.have.string('')      
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('validate required password value', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name : 'shandi', email : 'shan@mail.com', })
        .then(function(res) {
          expect(res.body.message).to.have.string('')   
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('validate required email unique value', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name : 'shandi', email : 'nino@mail.com', password : '123456'})
        .then(function(res) {
          console.log(res.body.message)  
          expect(res.body.message).to.have.string('email has already taken by another user!')
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('validate login email', function(done) {
        chai
        .request(app)
        .post('/users/login')
        .send({ email : 'nina@mail.com', password : '123456' })
        .then(function(res) {
          expect(res.body.message).to.have.string(`email/password invalid`)
          expect(res).to.have.status(404)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('validate login password', function(done) {
        chai
        .request(app)
        .post('/users/login')
        .send({ email : 'nina@mail.com', password : '1613456' })
        .then(function(res) {
          expect(res.body.message).to.have.string(`email/password invalid`)
          expect(res).to.have.status(404)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('validate password length', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name : 'nino', email : 'nina@mail.com', password : '12' })
        .then(function(res) {          
          expect(res.body.message).to.have.string('password length must be more than 6 characters!')
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })      
    })
  })
})

describe('Game CRUD', function() {

  describe('POST /game', function() {
    describe('success', function() {
      var gameId;
      it('sucess create game', function(done) {
        chai
        .request(app)
        .post('/games')
        .send({ name : 'Assasins', price : 2000, stock : 30 })
        .then(function(res) {
          gameId = res.body._id
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('stock');
          expect(res.body.name).to.equal('Assasins');
          expect(res.body.price).to.equal(2000);
          expect(res.body.stock).to.equal(30);
          done();
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('find all game suces', function(done) {
        chai
        .request(app)
        .get('/games')
        .then(function(res) {
          // expect(res.body).to.be.an('array');
          expect(res).to.have.status(200)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('find one game sucess', function(done) {
        chai
        .request(app)
        .get(`/games/findOne/${gameId}`)
        .send({ name : 'Assasins'})
        .then(function(res) {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal('Assasins')
          expect(res).to.have.status(200)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('update game sucess', function(done){
        chai
        .request(app)
        .patch(`/games/${gameId}`)
        .send({ name : `Tidak semudah itu ferguso`})
        .then(function(res) {
          console.log(res.body)
          expect(res.body).to.be.an('object');
          expect(res.body.nModified).to.have.be.equal(1);
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('delete game sucess', function(done) {
        console.log(gameId, 11111111)
        chai
        .request(app)
        .delete(`/games/${gameId}`)
        .then(function(res){
          // console.log(res.body)
          expect(res.body).to.be.an('object');
          expect(res.body.deletedCount).to.have.be.equal(1);
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
    })
    describe('failed', function() {
      it('findOne failed', function(done) {
        chai
        .request(app)
        .get(`/games/findOne/asdsadsa`)
        .send()
        .then(function(res) {
          console.log(res.body)  
          expect(res.body.message).to.have.string('game not found')        
          expect(res).to.have.status(404)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
    })
  })


})

// describe('')