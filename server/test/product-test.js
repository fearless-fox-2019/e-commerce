const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app');
const deleteAllProduct = require('../helpers/deleteAllProduct')



chai.use(chaiHttp);

const expect = chai.expect

after(function (done) {
    deleteAllProduct(done)
});

// describe 'CREATE'
// it('')
describe('product CRUD', function () {

    describe('POST /product', function () {
        describe('success', function () {
            var token
    it('should send status code 201 and successfully registered ', function(done){
        chai
            .request(app)
            .post('/api/users/signup')
            .send({username: 'eheheheheheheheheehehe', email: 'rejaaaa@gmail.com', password: '1234567'})
            .then(function(res){
                // console.log(res.body,"=============")
                // console.log(res.body, 'iniiii res.body')
                // console.log(res.body.role)
                token = res.body.access_token
                
                
                // expect(res.body).to.have.property('_id')
                // expect(res.body).to.have.property('email')
                // expect(res.body).to.have.property('password')
                // expect(res.body)
                // expect(res.body.email).to.equal('reza@gmail.com');
                // expect(res.body.password).to.equal('12345')

           
                done()
            })
            .catch(error=>{
                console.log(error)
            })
            
    })
            var productId;
            it('sucess create product', function (done) {
                chai
                    .request(app)
                    .post('/api/products')
                    .send({ price: 1000000, image: "asadadsadsa", color: "red", description: "bla bla", name: "teess", stock: 30, size: "M,L,XL" })
                    .then(function (res) {
                        //  console.log(res.body)
                        productId = res.body._id
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('name');
                        expect(res.body).to.have.property('price');
                        // expect(res.body.price).to.equal(1000000);
                        expect(res.body).to.have.property('stock');
                        expect(res.body.name).to.equal('teess');
                        expect(res.body.stock).to.equal(30);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('validation for out of stock', function (done) {
                chai
                    .request(app)
                    .post(`/api/products/stock/${productId}`)
                    .set('token',token)
                    .send({ stock: 40})
                    .then(function (res) {
                         console.log(res.body,"================== out out out")
                        //  expect(res.body.message).to.eqls('Error: image is empty')
                        // productId = res.body._id
                        // expect(res).to.have.status(400);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            // it('create cart', function (done) {
            //     chai
            //         .request(app)
            //         .post(`/api/carts/`)
            //         .set('token',token)
            //         .send({ selectedSize: "M",productCart:productId})
            //         .then(function (res) {
            //              console.log(res.body,"================== out out out")
            //             //  expect(res.body.message).to.eqls('Error: image is empty')
            //             // productId = res.body._id
            //             // expect(res).to.have.status(400);
            //             done();
            //         })
            //         .catch(err => {
            //             console.log(err)
            //         })
            // })
            it('find all product suces', function (done) {
                chai
                    .request(app)
                    .get('/api/products')
                    .then(function (res) {
                        expect(res.body).to.be.an('array');
                        expect(res).to.have.status(200)
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('find one product sucess', function (done) {
                chai
                    .request(app)
                    .get(`/api/products/${productId}`)
                    .send({ name: 'teess' })
                    .then(function (res) {
                        expect(res.body).to.be.an('object');
                        expect(res.body.name).to.be.equal('teess')
                        expect(res).to.have.status(200)
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('update product success', function (done) {
                chai
                    .request(app)
                    .put(`/api/products/${productId}`)
                    .send({ name: `teess` })
                    .then(function (res) {
                        console.log(res.body)
                        expect(res.body).to.be.an('object');
                        expect(res.body.nModified).to.have.be.equal(1);
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('delete product sucess', function (done) {
                chai
                    .request(app)
                    .delete(`/api/products/${productId}`)
                    .then(function (res) {
                        console.log(res.body)
                        expect(res.body).to.be.an('object');
                        // expect(res.body.deletedCount).to.have.be.equal(1);
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
        describe('failed', function () {
            it('validation for price', function (done) {
                chai
                    .request(app)
                    .post('/api/products')
                    .send({ price: '', image: "asadadsadsa", color: "red", description: "bla bla", name: "teess", stock: 30, size: "M,L,XL" })
                    .then(function (res) {
                        //  console.log(res.body,"==================")
                         expect(res.body.message).to.eqls('Error: every product have price!')
                        // productId = res.body._id
                        expect(res).to.have.status(400);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('validation for name', function (done) {
                chai
                    .request(app)
                    .post('/api/products')
                    .send({ price: '100000', image: "asadadsadsa", color: "red", description: "bla bla", name: "", stock: 30, size: "M,L,XL" })
                    .then(function (res) {
                        //  console.log(res.body,"==================")
                         expect(res.body.message).to.eqls('Error: name is empty')
                        // productId = res.body._id
                        expect(res).to.have.status(400);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('validation for color', function (done) {
                chai
                    .request(app)
                    .post('/api/products')
                    .send({ price: '1000000', image: "asadadsadsa", color: "", description: "bla bla", name: "teess", stock: 30, size: "M,L,XL" })
                    .then(function (res) {
                        //  console.log(res.body,"==================")
                         expect(res.body.message).to.eqls('Error: every product have color!')
                        // productId = res.body._id
                        expect(res).to.have.status(400);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('validation for description', function (done) {
                chai
                    .request(app)
                    .post('/api/products')
                    .send({ price: '000000', image: "asadadsadsa", color: "red", description: "", name: "teess", stock: 30, size: "M,L,XL" })
                    .then(function (res) {
                         console.log(res.body,"==================")
                         expect(res.body.message).to.eqls('Error: description is empty')
                        // productId = res.body._id
                        expect(res).to.have.status(400);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('validation for description', function (done) {
                chai
                    .request(app)
                    .post('/api/products')
                    .send({ price: '000000', image: "", color: "red", description: "", name: "teess", stock: 30, size: "M,L,XL" })
                    .then(function (res) {
                        //  console.log(res.body,"==================")
                         expect(res.body.message).to.eqls('Error: image is empty')
                        // productId = res.body._id
                        expect(res).to.have.status(400);
                        done();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
    })


})
