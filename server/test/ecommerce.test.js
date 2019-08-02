const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const removeAfterTesting = require('../helpers/deleteFiles')

after(function() {
    removeAfterTesting()
})


describe('User CRUD-login', function() {
    describe('POST /users/register', function() {
        it('valid input with status code is 201', function(done) {
            let newData = {
                username: 'indinabilah',
                email: 'indi@mail.com',
                password: '123'
            }
            chai.request(app)
            .post('/users/register')
            .send(newData)
            .end(function (err, res, req) {
                // console.log(res)
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body.username).to.equal('indinabilah')
                expect(res.body.email).to.equal('indi@mail.com')
                done()
            })
        }),
        it('Email cannot twice in system with status code is 400', function(done) {
            let newData = {
                username: 'indinabilah',
                email: 'indi@mail.com',
                password: '123'
            }
            chai.request(app)
            .post('/users/register')
            .send(newData)
            .end(function (err, res, req) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                done()
            })
        }),
        it('username cannot be empty with status code is 400', function(done) {
            let newData = {
                username: '',
                email: 'indi@mail.com',
                password: '123'
            }
            chai.request(app)
            .post('/users/register')
            .send(newData)
            .end(function (err, res, req) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                done()
            })
        }),
        it('invalid email with status code is 400', function(done) {
            let newData = {
                username: 'indinabilah',
                email: 'indi@mail',
                password: '123'
            }
            chai.request(app)
            .post('/users/register')
            .send(newData)
            .end(function (err, res, req) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                done()
            })
        }),
        it('email cannot be empty with status code is 400', function(done) {
            let newData = {
                username: 'indinabilah',
                email: '',
                password: '123'
            }
            chai.request(app)
            .post('/users/register')
            .send(newData)
            .end(function (err, res, req) {
                // console.log(res)
                expect(err).to.be.null
                expect(res).to.have.status(400)
                done()
            })
        }),
        it('password cannot be empty with status code is 400', function(done) {
            let newData = {
                username: 'indinabilah',
                email: 'indi@mail.com',
                password: ''
            }
            chai.request(app)
            .post('/users/register')
            .send(newData)
            .end(function (err, res, req) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                done()
            })
        })
    })
    describe('GET /users', function(){
        it('should be send an array with status code is 200', function(done) {
            chai.request(app)
            .get('/users')
            .end(function (err, res, req) {
                // console.log(res.body)
                expect(err).to.be.null;
                expect(res.body).to.be.an('Array')
                expect(res).to.have.status(200)
                done()
            })
        });
    })
    describe('POST /users/login', function(){
        it('should be send an object with status code is 200', function(done) {
            chai.request(app)
            .post('/users/login')
            .send({
                email: 'indi@mail.com',
                password: '123'
            })
            .end(function (err, res, req) {
                console.log(res.body)
                expect(err).to.be.null;
                expect(res.body).to.be.an('object')
                // harusnya balikan token tapi belom hmmm
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('email')
                // expect(res.body.email).to.equal('indi@mail.com')
                // expect(res.body.password).to.equal('123')
                expect(res).to.have.status(200)
                done()
            })
        }),
        it('wrong password should be send an error with status code is 400', function(done) {
            chai.request(app)
            .post('/users/login')
            .send({
                email: 'indi@mail.com',
                password: '1234'
            })
            .end(function (err, res, req) {
                // console.log(res.body)
                expect(err).to.be.null;
                expect(res.body).to.be.an('object')
                // harusnya balikan token tapi belom hmmm
                // expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('email')
                expect(res.body.email).to.equal('indi@mail.com')
                expect(res.body.password).to.equal('123')
                expect(res).to.have.status(400)
                done()
            })
        });
    })
});

describe('Product CRUD', function(){
    describe('GET /products', function(){
        it('should be send an object with status code is 200', function(done){
            chai.request(app)
            .get('/products')
            .end(function (err, res, req) {
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe('POST /products', function(){
        it('should be send an object with status code is 201', function(done){
            chai.request(app)
            .post('/products')
            .send({
                productname: 'Chocolate',
                price: 5000,
                stock: 10
            })
            .end(function (err, res, req) {
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(201)
                done()
            })
        })
    })
    describe('PATCH /products', function(){
        it('should be send an object with status code is 201', function(done){
            chai.request(app)
            .patch('/products/:id')
            .send({
                productname: 'Chocolate',
                price: 2000,
                stock: 10
            })
            .end(function (err, res, req) {
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(201)
                done()
            })
        })
    })
    describe('DELETE /products', function(){
        it('should be send an object with status code is 200', function(done){
            chai.request(app)
            .delete(`/products/5d357f7298cbfe1ee7d824ca`)
            .end(function (err, res, req) {
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(200)
                done()
            })
        })
    })
})

describe('Cart CRUD', function(){
    describe('GET /carts  -  by user id', function(){
        it('should be send an object with status code is 200', function(done){
            chai.request(app)
            .get('/carts/5d357302758edc1a980df85e')
            .end(function (err, res, req) {
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe('GET /carts  -  by product id', function(){
        it('should be send an object with status code is 200', function(done){
            chai.request(app)
            .get('/carts/5d357f7298cbfe1ee7d824ca')
            .end(function (err, res, req) {
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe('POST /carts', function(){
        it('should be send an object with status code is 201', function(done){
            chai.request(app)
            .post('/carts')
            .send({
                UserId: '5d357302758edc1a980df85e',
                ProductId: '5d357f7298cbfe1ee7d824ca'
            })
            .end(function(err, res, req){
                expect(err).to.be.null;
                // expect(req).to.have.headers;
                expect(res).to.have.status(201)
                done()
            })
        })
    })
})


