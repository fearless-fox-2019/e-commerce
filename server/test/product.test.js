const chaiHttp = require('chai-http')
const chai = require('chai')
const app = require('../app')
const {deleteProduct, deleteUser, customer, admin} = require('../helpers/test')
chai.use(chaiHttp)
const expect = chai.expect

let productId;
let access_token_admin;

before(async function(){
    access_token_admin =  await admin()
    // console.log('access_token_admin: ', access_token_admin);
    
})
after(async function(){
    await deleteUser()
    await deleteProduct()
})

describe('Products', function(){
    describe('ROUTE /products', function(){
        describe('Success Case', function(){
            it('POST, adding new product, should send status code 201', function(done){
                chai
                    .request(app)
                    .post('/products')
                    .set('access_token', access_token_admin)
                    .send({ itemName : 'sepatu', stock : '10', price : '10000', img : 'https://www.jakartanotebook.com/images/products/100/63/25943/2/sepatu-olahraga-kasual-size-35-black-45.jpg'})
                    .then(function(result){
                        productId = result.body._id
                        expect(result).to.have.status(201)
                        expect(result.body).to.be.an('Object')
                        expect(result.body).to.have.property('_id')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })

            })
            it('GET all products, should send status code 200', function(done){
                chai
                    .request(app)
                    .get('/products')
                    .then(function(result){
                        expect(result).to.have.status(200)
                        expect(result.body).to.be.an('Array')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('GET detail products, should send status code 200', function(done){
                chai
                    .request(app)
                    .get(`/products/${productId}`)
                    .then(function(result){
                        expect(result).to.have.status(200)
                        expect(result.body).to.be.an('Object')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('PUT all products, should send status code 200', function(done){
                chai
                    .request(app)
                    .put(`/products/${productId}`)
                    .set('access_token', access_token_admin)
                    .send({stock : '9'})
                    .then(function(result){
                        expect(result).to.have.status(200)
                        expect(result.body).to.be.an('Object')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('DELETE a products, should send status code 200', function(done){
                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .set('access_token', access_token_admin)
                    .then(function(result){
                        expect(result).to.have.status(200)
                        expect(result.body).to.be.an('Object')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
    })
})