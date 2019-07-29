const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const user = require('../models/user')
const product = require('../models/product')
let token = null
let token2 = null
let productId = null
let transactionId = null
chai.use(chaiHttp)

const loginDetails = {
    email: 'stephenlie55@gmail.com',
    password: 'stephenlie'
}
const loginDetails2 = {
    email: 'elia@gmail.com',
    password: 'eliaelia'
}
before(function (done) {
    user
        .deleteMany({})
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})
before(function (done) {
    product
        .deleteMany()
        .then(() => {
            done()
        })
        .catch((err) => {
            console.log(err)
        })
})
before(function (done) {
    chai
        .request(app)
        .post('/signup')
        .send({
            name: 'Stephen Lie',
            email: 'stephenlie55@gmail.com',
            password: 'stephenlie'
        })
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(err).to.be.null
            expect(res.body).to.be.an('object')
            done()
        })
})

before(function (done) {

    chai
        .request(app)
        .post('/signup')
        .send({
            name: 'elia',
            email: 'elia@gmail.com',
            password: 'eliaelia'
        })
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(err).to.be.null
            expect(res.body).to.be.an('object')
            done()
        })
})
before(function (done) {
    chai
        .request(app)
        .post('/signin')
        .send(loginDetails)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(err).to.be.null
            expect(res.body).to.haveOwnProperty('token')
            token = res.body.token
            done()
        })
})
before(function (done) {
    chai
        .request(app)
        .post('/signin')
        .send(loginDetails2)
        .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(err).to.be.null
            expect(res.body).to.haveOwnProperty('token')
            token2 = res.body.token
            done()
        })
})

describe('product', function () {
    describe('GET /product', function () {
        it('should send an array with 200 status code', function (done) {
            chai
                .request(app)
                .get('/product')
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('POST /product', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .post('/product')
                .set('token', token)
                .type('form')
                .send({
                    'name': 'TV',
                    'quantity': 100,
                    'description': 'LG 32"',
                    'image': null,
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    productId = res.body._id
                    expect(res.body.seller).to.be.a('string')
                    done()
                })
        })
    })
    describe('GET /product/:id', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .get(`/product/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
    describe('PATCH /product/:id', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .patch(`/product/${productId}`)
                .set('token', token)
                .send({
                    'name': 'Stephen'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal('Stephen')
                    done()
                })
        })
    })
    describe('PATCH /product/:id', function () {
        it('should send an error status 401 unauthorized', function (done) {
            chai
                .request(app)
                .patch(`/product/${productId}`)
                .set('token', token2)
                .send({
                    'name': 'hai'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('error')
                    done()
                })
        })
    })

    describe('POST /signup', function () {
        it('returns object with 200 status response', function (done) {
            chai
                .request(app)
                .post('/signup')
                .send({
                    name: 'Stephen',
                    email: 'stephenlie55@gmail.com',
                    password: 'stephenlie'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
        it('returns error email is invalid, has to be in the correct format', function (done) {
            chai
                .request(app)
                .post('/signup')
                .send({
                    name: 'Stephen',
                    email: 'stephenliemail',
                    password: 'stephenlie'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('error')
                    done()
                })
        })
    })
    describe('POST /signin', function () {
        it('has to return object with 200 status response', function (done) {
            chai
                .request(app)
                .post('/signin')
                .send({
                    email: 'stephenlie55@gmail.com',
                    password: 'stephenlie'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(err).to.be.null
                    done()
                })
        })
        it('has to return error object with 400 status response, when email or password is wrong', function (done) {
            chai
                .request(app)
                .post('/signin')
                .send({
                    email: 'stephenlie55@gmail.com',
                    password: 'testingpassword'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('error')
                    done()
                })
        })
    })
    describe('PATCH /user/cart/add/:productId', function () {
        it('has to return object with 200 status response', function (done) {
            chai
                .request(app)
                .patch(`/user/cart/add/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(res.body).to.be.an('object')
                    expect(res.body.cart).to.have.lengthOf.at.least(1)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe('POST /transaction', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .post(`/transaction`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.products).to.have.lengthOf.at.least(1)
                    expect(res.body.delivered).to.equal(false)
                    transactionId = res.body._id
                    done()
                })
        })
    })
    describe('PATCH /transaction/:transactionId', function () {
        it('should have delivered property equal to true', function (done) {
            chai
                .request(app)
                .patch(`/transaction/${transactionId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.delivered).to.equal(true)
                    done()
                })
        })
    })
    describe('PATCH /user/cart/remove/:productId', function () {
        it('has to return object with 200 status response, where product id is removed from cart', function (done) {
            chai
                .request(app)
                .patch(`/user/cart/remove/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.cart).to.not.include(`${productId}`)
                    done()
                })
        })
    })
    describe('DELETE /product/:id', function () {
        it('should send an object with 200 status code', function (done) {
            chai
                .request(app)
                .delete(`/product/${productId}`)
                .set('token', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })




})