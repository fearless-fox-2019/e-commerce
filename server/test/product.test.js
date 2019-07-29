const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
const deleteAllProducts = require('../helpers/deleteAllProduct');
const deleteAllUser = require('../helpers/deleteAllUser');

chai.use(chaiHttp);

const expect = chai.expect;
var token = ''
after(function () {
  deleteAllProducts()
  deleteAllUser()
})

describe('UserSignUp' ,function(){
  it('should return token when username is unique', function (done) {
    chai.request(app)
      .post('/users/signup')
      .send({
        username: 'irsanhaxZxdi',
        email: 'halobandung@mail.com',
        password: 'adasdasdasd'
      })
      .then(function (res) {
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('token')
        token = res.body.token
        done()
      })
      .catch(function (err) {
        console.log(err);
      })
  })
})

describe('Product CRUD', function () {
  describe('POST /products', function () {
    it('should return object with new product', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res).has.to.be.an("object")
          expect(res.body).to.have.property('data')
          expect(res.body).to.have.property('msg')
          expect(res.body.data).to.have.property('_id')
          expect(res.body.data).to.have.property('name')
          expect(res.body.data).to.have.property('quantity')
          expect(res.body.data).to.have.property('picture')
          expect(res.body.data).to.have.property('description')
          expect(res.body.data.quantity).has.to.be.a('number')
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if token empty', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if token not match', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token', 'asdlnasdkjancjnaksndkajs')
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if name empty', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token', token)
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if quantity input type is NaN', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "asdasdwd",
          quantity: '1231asdas',
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token', token)
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if price type is NaN', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "asdasdwd",
          quantity: 12,
          picture: "",
          description: "",
          price : 'adewdwdsd'
        })
        .set('token', token)
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
    it('should return error with status 400 if price empty', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "asdasdwd",
          quantity: 12,
          picture: "",
          description: "",
          price : ''
        })
        .set('token', token)
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
  })

  describe('GET /products', function () {
    it('should send an array with 200 status code', function (done) {
      chai.request(app)
        .get('/products')
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).has.to.be.an('array')
          done()
        })
        .catch(err => {
          console.log(err);
        })
    })
  })

  describe('DELETE /products', function () {
    it('should send number of deleted data with status 200 code', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .delete(`/products/${data.data._id}`)
            .set('token',token)
        })
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body.data).to.have.property('deletedCount')
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
    it('should send err with status 400 code if token empty', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .delete(`/products/${data.data._id}`)
        })
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
    it('should send err with status 400 code if token not match', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .delete(`/products/${data.data._id}`)
            .set('token', 'adasjkcjknwcnkjasnacskjac')
        })
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
    it('should send err with status 500 code if param.id is not match', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .delete(`/products/12w1s1sn1o312`)
            .set('token', token)
        })
        .then(res => {
          expect(res).to.have.status(500)
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
  })

  describe('UPDATE /products', function () {
    it('should send number of updated data with status 200 code', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .put(`/products/${data.data._id}`)
            .send({
              name: "kaos kaki",
              quantity: 14,
              picture: "",
              description: 'ini kaos kaki baru saya',
              price : 123141231
            })
            .set('token',token)
        })
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body.msg).to.include('berhasil update')
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
    it('should error with status code 400 if token empty', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .put(`/products/${data.data._id}`)
            .send({
              name: "kaos kaki",
              quantity: 14,
              picture: "",
              description: 'ini kaos kaki baru saya',
              price : 123141231
            })
        })
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
    it('should error with status code 400 if token not match', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .put(`/products/${data.data._id}`)
            .send({
              name: "kaos kaki",
              quantity: 14,
              picture: "",
              description: 'ini kaos kaki baru saya',
              price : 123141231
            })
            .set('token','asdjkandajcnaklnaslc')
        })
        .then(res => {
          expect(res).to.have.status(400)
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
    it('should send number of updated data with status 200 code', function (done) {
      chai.request(app)
        .post('/products')
        .send({
          name: "sepatu",
          quantity: 10,
          picture: "",
          description: 'ini sepatu baru saya',
          price : 100000
        })
        .set('token',token)
        .then(res => {
          return res.body
        })
        .then(data => {
          return chai.request(app)
            .patch(`/products/${data.data._id}`)
            .send({
              name: "kaos kaki",
              quantity: 14,
              picture: "",
              description: 'ini kaos kaki baru saya',
              price : 123141231
            })
            .set('token',token)
        })
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body.msg).to.include('berhasil update')
          done()
        })
        .catch(err =>{
          console.log(err);
        })
    })
  })
})
