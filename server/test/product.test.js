const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const deleteAllProducts = require('../helpers/deleteAllProducts')
const expect = chai.expect

chai.use(chaiHttp)

// after(function () {
//     deleteAllProducts()
// })
describe('Product CRUD', function () {
    // GET ALL PRODUCTS
    describe('GET /products', function () {
        it('should return array of objects with status code 200', function (done) {
            chai
                .request(app)
                .get('/products')
                .then(function (res) {

                    //Assertion
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()

                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    let productId = ''
    // CREATE NEW PRODUCT
    describe('POST /products', function () {
        it('should return object with status code 201', function (done) {
            chai
                .request(app)
                .post('/products')
                .send({
                    name: 'Shoe',
                    description: 'new arrival shoes',
                    price: 2000,
                    amount: 10
                })
                .then(function (res) {
                    productId = res.body._id
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body.name).to.equal('Shoe');
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    //  GET ONE PRODUCT
    describe('GET /products/:productId', function () {
        it('should return 1 object with status code 200', function (done) {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    // GET WRONG PRODUCT ID
    describe('ERROR GET /products/:productId', function () {
        it('should return status code 500 Internal Server Error', function (done) {
            chai
                .request(app)
                .get('/products/11234')
                .then(function (res) {
                    expect(res).to.have.status(500);
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    // UPDATE A PRODUCT
    describe('PUT /products/edit/:productId', function () {
        it('should return number of row updated with status 200', function () {
            chai
                .request(app)
                .put(`/products/edit/${productId}`)
                .send({
                    name: 'Shoe',
                    description: 'old shoes',
                    price: 4583745,
                    amount: 10
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('n')
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    // DELETE PRODUCT
    describe('PUT /products/delete/:productId', function () {
        it('should return number of row updated with status 200', function () {
            chai
                .request(app)
                .delete(`/products/delete/${productId}`)
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('n')
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})