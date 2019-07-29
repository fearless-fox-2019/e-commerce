const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app');
const deleteAll = require('../helpers/deleteAll')
// const token = require('./user.test')

chai.use(chaiHttp);

const expect = chai.expect

after(function(done) {
  deleteAll(done)
});

let token;

describe('User Login/Register', function() {
  describe('success register', function() {
    it('should send an object with 201 status code', function(done) {
      chai
      .request(app)
      .post('/users/register')
      .send({ name: 'youtsuba', email : 'youtsuba@mail.com', password : '123456', isAdmin : true })
      .then(function(res) {
        console.log(res.body.password)
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('password');
        expect(res.body.name).to.equal('youtsuba');
        expect(res.body.email).to.equal('youtsuba@mail.com');          
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
      .send({ email : 'youtsuba@mail.com', password : '123456' })
      .then(function(res) {
        token = res.body.token
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('password');
        expect(res.body.data.email).to.equal('youtsuba@mail.com');
        done()
      })
      .catch(err => {
        console.log(err)
      })
    }) 

})
// })

let gameId;
describe('Game CRUD', function() {

  describe('POST /game', function() {
    describe('success', function() {
      it('sucess create game', function(done) {
        chai
        .request(app)
        .post('/games')
        .set('token', token)
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
        .get(`/games/${gameId}`)
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
        .set('token', token)
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
        .set('token', token)
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
        .set('token', token)
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
        .set('token', token)
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
        .get(`/games/5d374ad316c0f0428d408992`)
        .set('token', token)
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
        .set('token', token)
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
    })
    describe('delete success or failed', function() {
      it('delete failed', function(done) {       
        chai
        .request(app)
        .delete('/games/5d374ad316c0f0428d408992')
        .set('token', token)
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
        .set('token', token)
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
})