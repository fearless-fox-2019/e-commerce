const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app');
const deleteAll = require('../helpers/deleteAll')

chai.use(chaiHttp);

const expect = chai.expect

// after(function(done) {
//   deleteAll(done)
// });


describe('User Login/Register', function() {  

  describe('Success POST /user', function() {
    describe('success register', function() {
      it.only('should send an object with 201 status code', function(done) {
        chai
        .request(app)
        .post('/users/register')
        .send({ name: 'nino', email : 'nino@mail.com', password : '123456' })
        .then(function(res) {
          console.log(res.body.password)
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          expect(res.body.name).to.equal('nino');
          expect(res.body.email).to.equal('nino@mail.com');          
          done();
        })
        .catch(err=> {
          console.log(err)
        })
      })
      it.only('success login user', function(done) {        
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
          expect(res.body.password).to.equal('123456')
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

describe('product test', function() {
  
})

describe('Game CRUD', function() {
  var gameId;

  describe('POST /game', function() {
    describe('success', function() {
      it('sucess create game', function(done) {
        chai
        .request(app)
        .post('/games')
        .send({ name : 'Assasins', price : 2000, stock : 30 })        
        .then(function(res) {
          console.log(res.body)
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
      it('find all game success', function(done) {
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
      it('find one game success', function(done) {
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
        console.log(gameId)
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
    })
    describe('failed', function() {
      it('create failed name blank', function(done){
        chai
        .request(app)
        .post('/games')
        .send({ description : 'aaaaa', image : 'asdasds', price : 450000, stock : 25 })
        .then(function(res) {
          console.log(res.body)
          expect(res.body.message).to.have.string('name can\'t be blank')
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('create failed price blank', function(done){
        chai
        .request(app)
        .post('/games')
        .send({ name : 'aaaa', description : 'aaaaa', image : 'asdasds', stock : 25 })
        .then(function(res) {
          console.log(res.body)
          expect(res.body.message).to.have.string('price can\'t be blank')
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('create failed stock blank', function(done){
        chai
        .request(app)
        .post('/games')
        .send({ name : 'aaaa', description : 'aaaaa', image : 'asdasds',price : 500000 })
        .then(function(res) {
          console.log(res.body)
          expect(res.body.message).to.have.string('stock can\'t be blank')
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('findOne failed', function(done) {
        chai
        .request(app)
        .get(`/games/findOne/5d374ad316c0f0428d408992`)
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
      it('update failed', function(done) {
        chai
        .request(app)
        .patch('/games/5d374ad316c0f0428d408992')
        .send({ name : 'aaa', description : 'aaaaa', price : 40000, stock : 21 })
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
      // it.only('update unique name failed', function(done) {
        // let create =  chai.request(app).post('/games').send({ name : 'asda', description : 'asdadasda', image : 'sadsadsad', price : 2000, stock : 20 })
        // let updateId;        
        // new Promise((resolve,reject) => {
        //   resolve(create)
        // })
        // .then(res => {
        //   console.log(res.body)
          // updateId = res.body._id
          // console.log(updateId)
          // return chai.request(app).patch(`/games/${updateId}`).send({ name : 'Assasins' })
        // })
        // .then(res => {
        //   console.log(res.body)
        // })        
        // chai
        // .request(app)
        // .patch(`/games/${gameId}`)
        // .send({ name : 'Assasins' })
        // .then(function(res) {
        //   console.log(gameId)
        //   console.log(res.body)
        //   expect(res.body.message).to.have.string('dup key: { : "assasins" }')
        //   expect(res).to.have.status(500)
        //   done()
        // })
        // .catch(err => {
          // console.log(err)
          // console.log(gameId)
        // })
      // })
    })
    describe('delete success or failed', function() {
      it('delete failed', function(done) {       
        chai
        .request(app)
        .delete('/games/5d374ad316c0f0428d408992')
        .send()
        .then(function(res) {
          // console.log(res.body)
          expect(res.body.message).to.have.string('game not found')
          expect(res).to.have.status(404)
          done()
        })
        .catch(err => {
          console.log(err)
        })
      })
      it('delete game sucess', function(done) {
        // console.log(gameId, 11111111)
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
  })



})

// describe('')