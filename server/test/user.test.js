const assert = require('assert')
const chai = require('chai')
  , chaiHttp = require('chai-http')
var expect = require('chai').expect
const app = require('../app');
const deleteAllUser = require('../helpers/deleteAllUser');
chai.use(chaiHttp)
var token = ''
after(function () {
  deleteAllUser();
})

describe('User', function () {
  describe('Signup', function () {
    it('should return token when username is unique', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'irsan',
          email: 'halo@mail.com',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('token')
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('should return err status 400 when username not unique', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'irsan',
          email: 'halohaha@mail.com',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          // expect(res.body).to.have.property('token')
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('should return err status 400 when email not unique', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'irsantoy',
          email: 'halo@mail.com',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          // expect(res.body).to.have.property('token')
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('email shouldnt be empty', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'adasdasd',
          email: '',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('username shouldnt be empty', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: '',
          email: 'hahah@mail.com',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('password shouldnt be empty', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'hahaha',
          email: 'hahah@mail.com',
          password: ''
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('email format should valid', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'hahaha',
          email: 'hamail.com',
          password: 'asdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('password length must be more than 5', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'hahaha',
          email: 'hamail@mail.com',
          password: 'as'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('password can only contain alpha numeric', function (done) {
      chai.request(app)
        .post('/users/signup')
        .send({
          username: 'hahaha',
          email: 'hamail@mail.com',
          password: 'as sdasd sadas '
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
  })
  describe('Signin', function () {
    it('should return object with payload token with status 200 if username and password match', function (done) {
      chai.request(app)
        .post('/users/signin')
        .send({
          username: 'irsan',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('token')
          token = res.body.token
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('should return error with status 400 if username not match', function (done) {
      chai.request(app)
        .post('/users/signin')
        .send({
          username: 'irsanzz',
          password: 'adasdasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          expect(res.body.err).to.have.string('Invalid username / password')
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    it('should return error with status 400 if password not match', function (done) {
      chai.request(app)
        .post('/users/signin')
        .send({
          username: 'irsan',
          password: 'adasdasdasasdasd'
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          expect(res.body.err).to.have.string('Invalid username / password')
          done()
        })
        .catch(function (err) {
          console.log(err);
        })
    })
  })
  describe('AddCart', function () {
    it('should return object with msg "berhasil update" and status 200 if success', function (done) {
      chai.request(app)
        .patch('/users/cart')
        .send({
          cart: []
        })
        .set('token', token)
        .then(function (res) {
          expect(res).to.have.status(200)
          expect(res.body).has.property('msg')
          expect(res.body.msg).has.string('berhasil update')
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if doesnt have token', function (done) {
      chai.request(app)
        .patch('/users/cart')
        .send({
          cart: []
        })
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if token not match', function (done) {
      chai.request(app)
        .patch('/users/cart')
        .send({
          cart: []
        })
        .set('token', 'asdkjashdjkabdjkcwbwjekbcekwjc')
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
  })
  describe('FindById', function() {
    it('should return object with status 200 if success', function (done) {
      chai.request(app)
        .get('/users/findById')
        .set('token', token)
        .then(function (res) {
          expect(res).to.have.status(200)
          expect(res.body).to.has.property('data')
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
    it('should return err with status 400 if token not exist', function (done) {
      chai.request(app)
        .get('/users/findById')
        .then(function (res) {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
});