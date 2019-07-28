const chaiHttp = require('chai-http')
const chai = require('chai')
const app = require('../app')
const {deleteProduct, deleteUser, customer, admin, product, deleteCart} = require('../helpers/test')
chai.use(chaiHttp)
const expect = chai.expect

let cartId;
let productId;
// let access_token_admin;
let access_token_customer;

before(async function(){
    access_token_customer =  await customer()
    // console.log('access_token_customer: ', access_token_customer);
    productId = await product()
    // console.log('productId: ', productId);
})
after(async function(){
    await deleteUser()
    await deleteProduct()
    await deleteCart()
})

describe('Carts', function(){
    describe('ROUTE /carts', function(){
        describe('Success Case', function(){
            it('POST, adding new cart, should send status code 201', function(done){
                chai
                    .request(app)
                    .post('/carts')
                    .set('access_token', access_token_customer)
                    .send({ productId : productId , amount: 5})
                    .then(function(result){
                        // console.log('result.body: ', result.body);
                        cartId = result.body._id
                        // console.log('cartId: ', cartId);
                        expect(result).to.have.status(201)
                        expect(result.body).to.be.an('Object')
                        expect(result.body).to.have.property('_id')
                        expect(result.body).to.have.property('userId')
                        expect(result.body).to.have.property('productId')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('GET, all carts, should send status code 200', function(done){
                chai
                    .request(app)
                    .get(`/carts/${cartId}`)
                    .set('access_token', access_token_customer)
                    .then(function(result){
                        expect(result).to.have.status(200)
                        expect(result.body).to.be.an('Array')
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            it('DELETE a cart, should send status code 200', function(done){
                chai
                    .request(app)
                    .delete(`/carts/${cartId}`)
                    .set('access_token', access_token_customer)
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