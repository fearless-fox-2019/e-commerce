const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const { clearProduct } = require('../helpers/clearDb')
const User = require('../models/user')
const { generateJWT } = require('../helpers/helper')

chai.use(chaiHttp)

var token = ''
var adminToken = ''

before((done) => {
    let arr = [
        User
            .create({
                name: 'Tes',
                email: 'tes@mail.com',
                password: 'tes'
            }),
        User
            .create({
                name: 'Admin',
                email: 'admin@warung.com',
                password: 'admin',
                role: 'Admin'
            })

    ]
    Promise
        .all(arr)
        .then(([user, admin]) => {
            token = generateJWT(user._id, user.name, user.role)
            adminToken = generateJWT(admin._id, admin.name, admin.role)
            clearProduct(done)
        })
        .catch(err => {
            console.log(err)
        })

})

after(function(done) {
    clearProduct(done)
})

describe('Product Test', function() {

    let _id = null

    let newProduct = {
        name: 'Uno',
        price: 50000,
        stock: 10,
    }

    describe('POST - Success', function() {

        describe('/products', function() {
            it('should send an object with status code 201', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('accesstoken', adminToken)
                    .send(newProduct)
                    .then((res)=> {
                        _id = res.body._id
    
                        expect(res).to.have.status(201)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body.name).to.equal(newProduct.name)
                        expect(res.body.price).to.equal(newProduct.price)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    })

    describe('POST - Failed', function() {

        describe('/products - Field stock zero', function() {
            it('should send an error validation message with status code 403', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('accesstoken', adminToken)
                    .send({
                        name: 'Uno',
                        price: 50000,
                        stock: 0,
                        description: ''
                    })
                    .then((res)=> {
                        expect(res).to.have.status(403)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Product validation failed: stock: Invalid input')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    
        describe('/products - Empty price', function() {
            it('should send an error validation message with status code 403', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('accesstoken', adminToken)
                    .send({
                        name: 'Uno',
                        price: '',
                        stock: 10,
                        description: 'Card game'
                    })
                    .then((res)=> {
                        expect(res).to.have.status(403)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Product validation failed: price: Product price required')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    
        describe('/products - Empty name', function() {
            it('should send an error validation message with status code 403', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('accesstoken', adminToken)
                    .send({
                        name: '',
                        price: 50000,
                        stock: 10
                    })
                    .then((res)=> {
                        expect(res).to.have.status(403)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Product validation failed: name: Product name required')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
        
        describe('/products - Without access token', function() {
            it('should send an error validation message with status code 401', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .send(newProduct)
                    .then((res)=> {
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Please login to continue')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })

        describe('/products - Not admin', function() {
            it('should send an error validation message with status code 401', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('accesstoken', token)
                    .send(newProduct)
                    .then((res)=> {
                        expect(res).to.have.status(403)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Forbidden')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    })

    describe('GET - Success', function() {
        describe('/products', function() {
            it('should send an array of objects with status code 200', function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .set('accesstoken', token)
                    .then((res)=> {
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('Object')
                        expect(res.body[0]).to.have.property('_id')
                        expect(res.body[0]).to.have.property('name')
                        expect(res.body[0].name).to.equal(newProduct.name)
                        expect(res.body[0].price).to.equal(newProduct.price)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    })

    describe('PATCH - Success', function() {
        describe('/products - Change the value', function() {
            it('should send an object with status code 200', function(done) {
                chai
                    .request(app)
                    .patch('/products' + `/${_id}`)
                    .set('accesstoken', adminToken)
                    .send({
                        stock: 12
                    })
                    .then((res)=> {
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('Object')
                        expect(res.body.n).to.equal(1)
                        expect(res.body.ok).to.equal(1)
                        expect(res.body.nModified).to.equal(1)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    
        describe('/products - Without change the value', function() {
            it('should send an object with status code 200', function(done) {
                chai
                    .request(app)
                    .patch('/products' + `/${_id}`)
                    .set('accesstoken', adminToken)
                    .send({
                        stock: 12
                    }).then((res)=> {
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('Object')
                        expect(res.body.n).to.equal(1)
                        expect(res.body.ok).to.equal(1)
                        expect(res.body.nModified).to.equal(0)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    
    })

    describe('PATCH - Failed', function() {
        describe('/products - Without access token', function() {
            it('should send an object with status code 401', function(done) {
                chai
                    .request(app)
                    .patch('/products' + `/${_id}`)
                    .then((res)=> {
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Please login to continue')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })

        describe('/products - Not admin', function() {
            it('should send an error validation message with status code 401', function(done) {
                chai
                    .request(app)
                    .patch('/products' + `/${_id}`)
                    .set('accesstoken', token)
                    .send({
                        stock: 13
                    })
                    .then((res)=> {
                        expect(res).to.have.status(403)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Forbidden')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })

        describe('/products - Id is not valid', function() {
            it('should send an object with status code 400', function(done) {
                const random_id = '1231456'
    
                chai
                    .request(app)
                    .patch('/products' + `/${random_id}`)
                    .set('accesstoken', adminToken)
                    .then((res)=> {
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal(`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    })

    describe('DELETE - Success', function() {

        describe('/products', function() {
            it('should send an object with status code 200', function(done) {
                chai
                    .request(app)
                    .delete('/products' + `/${_id}`)
                    .set('accesstoken', adminToken)
                    .then((res)=> {
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('Object')
                        expect(res.body.n).to.equal(1)
                        expect(res.body.ok).to.equal(1)
                        expect(res.body.deletedCount).to.equal(1)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })    
    })

    describe('DELETE - Failed', function() {
        describe('/products - Without access token', function() {
            it('should send an object with status code 401', function(done) {
                chai
                    .request(app)
                    .delete('/products' + `/${_id}`)
                    .then((res)=> {
                        expect(res).to.have.status(401)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Please login to continue')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })

        describe('/products - Not admin', function() {
            it.skip('should send an error validation message with status code 401', function(done) {
                chai
                    .request(app)
                    .delete('/products' + `/${_id}`)
                    .set('accesstoken', token)
                    .then((res)=> {
                        expect(res).to.have.status(403)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal('Forbidden')
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })

        describe('/products - Id is not valid', function() {
            it.skip('should send an object with status code 400', function(done) {
                const random_id = '1231456'
    
                chai
                    .request(app)
                    .delete('/products' + `/${random_id}`)
                    .set('accesstoken', adminToken)
                    .then((res)=> {
                        expect(res).to.have.status(500)
                        expect(res).to.be.an('Object')
                        expect(res.body).to.have.property('message')
                        expect(res.body.message).to.equal(`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`)
                        done()
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
            })
        })
    })
})