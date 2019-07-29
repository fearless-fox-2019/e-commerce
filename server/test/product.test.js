const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs =  require('fs')
let access_token
let id
chai.use(chaiHttp);

describe('Products', function() {
    // GET ALL PRODUCT
    describe('SUCCESS GET ALL PRODUCTS, GET /products', function() {
      it('should send an object with 200 status code', function(done) {
        chai
        .request(app)
        .get('/products')
        .then(function(res) {
            // Assertion
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array')
            done();
        })
        .catch(function(err) {
          console.log(err)
        })
      })
    })
    
    // CREATE A PRODUCT
    describe('Users, SIGNUP (POST /users/signup)', function() {
        // SUCCESS
        describe('SUCCESS, POST /products', function() {
            it('should send an object with 201 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .attach('img', fs.readFileSync('/Users/elia/Desktop/CIMB/P2/p2.1/porto/e-commerce-1/server/test/test.jpg'), 'test.jpg')
                .field('name', 'Item 1')
                .field('description', 'Warna: Biru')
                .field('price', '10000')
                .field('stock', '12')
                .field('hotProducts', 'false')
                .then(function(res) {
                    id = res.body._id
                    // Assertion
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('img')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('hotProducts')
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })

        // ERROR WITHOUT IMG
        describe('ERROR WITHOUT IMG, POST /products', function() {
            it('should send an object with 400 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .field('img', '')
                .field('name', 'Item 1')
                .field('description', 'Warna: Biru')
                .field('price', '10000')
                .field('stock', '12')
                .field('hotProducts', 'false')
                .then(function(res) {
                    // Assertion
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Please input product's image")
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })

        // ERROR WITHOUT NAME
        describe('ERROR WITHOUT NAME, POST /products', function() {
            it('should send an object with 400 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .attach('img', fs.readFileSync('/Users/elia/Desktop/CIMB/P2/p2.1/porto/e-commerce-1/server/test/test.jpg'), 'test.jpg')
                .field('name', '')
                .field('description', 'Warna: Biru')
                .field('price', '10000')
                .field('stock', '12')
                .field('hotProducts', 'false')
                .then(function(res) {
                    // Assertion
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Please input product's name")
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })

        // ERROR WITHOUT DESCRIPTION
        describe('ERROR WITHOUT DESCRIPTION, POST /products', function() {
            it('should send an object with 400 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .attach('img', fs.readFileSync('/Users/elia/Desktop/CIMB/P2/p2.1/porto/e-commerce-1/server/test/test.jpg'), 'test.jpg')
                .field('name', 'Item 1')
                .field('description', '')
                .field('price', '10000')
                .field('stock', '12')
                .field('hotProducts', 'false')
                .then(function(res) {
                    // Assertion
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Please input product's description")
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })

        // ERROR WITHOUT PRICE
        describe('ERROR WITHOUT PRICE, POST /products', function() {
            it('should send an object with 400 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .attach('img', fs.readFileSync('/Users/elia/Desktop/CIMB/P2/p2.1/porto/e-commerce-1/server/test/test.jpg'), 'test.jpg')
                .field('name', 'Item 1')
                .field('description', 'Warna: Biru')
                .field('price', '')
                .field('stock', '12')
                .field('hotProducts', 'false')
                .then(function(res) {
                    // Assertion
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Please input product's price")
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })

        // ERROR WITHOUT STOCK
        describe('ERROR WITHOUT STOCK, POST /products', function() {
            it('should send an object with 400 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .attach('img', fs.readFileSync('/Users/elia/Desktop/CIMB/P2/p2.1/porto/e-commerce-1/server/test/test.jpg'), 'test.jpg')
                .field('name', 'Item 1')
                .field('description', 'Warna: Biru')
                .field('price', '10000')
                .field('stock', '')
                .field('hotProducts', 'false')
                .then(function(res) {
                    // Assertion
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Please input product's stock")
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })

        // ERROR NOT AN IMAGE FILE
        describe('ERROR NOT AN IMAGE FILE, POST /products', function() {
            it('should send an object with 400 status code', function(done) {
                this.timeout(5000);
                chai
                .request(app)
                .post('/products')
                .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzZmMTY0MzRmYjZlMjJkZTE1ZGJlZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjM4ODE4NzB9.RsPtVFELVrHINjHeWT_8R95lA5jDDOu94cBaYpeiZZU')
                .attach('img', fs.readFileSync('/Users/elia/Desktop/CIMB/P2/p2.1/porto/e-commerce-1/server/test/test.js'), 'test.js')
                .field('name', 'Item 1')
                .field('description', 'Warna: Biru')
                .field('price', '10000')
                .field('stock', '12')
                .field('hotProducts', 'false')
                .then(function(res) {
                    // Assertion
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Image only with ext png, jpg, jpeg & gif")
                    done()
                })
                .catch(function(err) {
                    console.log(err)
                })
            })
        })
    })

    // GET PRODUCT BY ID
    describe.skip('Success Get product by id, GET /products/:id', function() {
        it('should send an object with 200 status code', function(done) {
          chai
          .request(app)
          .get(`/products/${id}`)
          .then(function(res) {
              // Assertion
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object')
              done();
          })
          .catch(function(err) {
            console.log(err)
          })
        })
    })

})