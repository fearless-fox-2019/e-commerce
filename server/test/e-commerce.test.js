const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../app'),
    deleteAllProducts = require('../helpers/deleteAllProducts'),
    deleteAllUsers = require('../helpers/deleteAllUsers'),
    deleteAllCarts = require('../helpers/deleteAllCarts')
        
    chai.use(chaiHttp)
    const expect = chai.expect

    after(function() {
        deleteAllProducts();
        deleteAllUsers();
        deleteAllCarts();
    });

describe('Testing', function () {
    describe('Products CRUD', function() {
        describe('GET /products', function() {
            it('should send an array with 200 status code', function(done) {
                chai
                    .request(app)
                    .get('/products')
                    .then(function(res) {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
    
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })
    
        describe('POST /products', function() {
            it('should send an object with 201 status code', function(done) {
                chai
                    .request(app)
                    .post('/products')
                    .send({name: 'Mouse', price: 30000, stock: 20})
                    .then(function(res) {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('name');
                        expect(res.body).to.have.property('price');
                        expect(res.body).to.have.property('stock');
                        expect(res.body.name).to.equal('Mouse');
                        expect(res.body.price).to.equal(30000);
                        expect(res.body.stock).to.equal(20)
                        done();
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })
    
        describe('PUT /products', function() {
            it('should send an object with 200 status codes', function(done){
                chai
                    .request(app)
                    .get('/products')
                    .then(function(response){
                        chai.
                        request(app)
                        .put('/products/'+response.body[0]._id)
                        .send({name: 'Dog Food', price: 40000, stock: 10})
    
                        .then(function(res){
                            chai
                            .request(app)
                            .get('/products/'+response.body[0]._id)
    
                            .then(function(res){
                                expect(res.body).to.have.property('_id');
                                expect(res.body).to.have.property('name');
                                expect(res.body).to.have.property('price');
                                expect(res.body).to.have.property('stock');
                                expect(res.body.name).to.equal('Dog Food');
                                expect(res.body.price).to.equal(40000);
                                expect(res.body.stock).to.equal(10)
                                done();
                            })
                        })
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })
    
        describe('PATCH /products', function() {
            it('should send an object with 200 status codes', function(done){
                chai
                    .request(app)
                    .get('/products')
                    .then(function(response){
                        chai.
                        request(app)
                        .patch('/products/'+response.body[0]._id)
                        .send({name: 'Cat Food'})
                        
                        .then(function(res){
                            expect(res.body).to.have.property('_id');
                            expect(res.body).to.have.property('name');
                            expect(res.body).to.have.property('price');
                            expect(res.body).to.have.property('stock');
                            expect(res.body.name).to.equal('Cat Food');
                            expect(res.body.price).to.equal(40000);
                            expect(res.body.stock).to.equal(10)
                            done();
                        })
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })
    
        describe('DELETE /products', function() {
            it('should send an object with 200 status codes', function(done){
                chai
                    .request(app)
                    .get('/products')
                    .then(function(response){
                        chai.
                        request(app)
                        .delete('/products/'+response.body[0]._id)
                        .then(function(res){
                            expect(res.body).to.have.property('_id');
                            expect(res.body).to.have.property('name');
                            expect(res.body).to.have.property('price');
                            expect(res.body).to.have.property('stock');
                            done();
                        })
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })
    })
    
    describe('Users CRUD', function () {
        describe('POST /users/signup', function() {
            it('should send an object with 201 status codes', function(done){
                chai
                    .request(app)
                    .post('/users/signup')
                    .send({name: 'Aditya', email: 'aditya@pradana.com', password: 'password'})
                    .then(function(res) {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('name');
                        expect(res.body).to.have.property('email');
                        expect(res.body).to.have.property('password');
                        done();
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })

        describe('POST /users/signin', function() {
            it('should send an object with 200 status codes', function(done){
                chai
                    .request(app)
                    .post('/users/signin')
                    .send({ email: 'aditya@pradana.com', password: 'password'})
                    .then(function(res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('access_token');
                        expect(res.body).to.have.property('username');
                        done();
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            })
        })
    })
})