const chai = require('chai');
const chaiHttp = require('chai-http');
const User= require('../models/user')
const Item= require('../models/item')
const fs= require('fs')
const {generateToken}= require('../helpers/jwt')
const {deleteUser, deleteItem} = require('../helpers/deleteDb')


chai.use(chaiHttp);


const app = require('../app');
const expect = chai.expect;

var sellerToken=''
var buyerId=''
var buyerToken=''
var itemId=''



before(function(done){

        let promises = [
            User
                .create({
                    name: 'Cust',
                    email: 'cust@mail.com',
                    password: 'cust'
    
                }),
            User
                .create({
                    name: 'Mei',
                    email: 'mei@mail.com',
                    password: 'admin',
                    role: 'admin'
                })
            
        ]

        Promise.all(promises)
        .then(([buyer, seller]) => {

            sellerToken= generateToken({
                id: seller._id,
                email: seller.email,
                name: seller.name,
                role: seller.role
            })

            buyerId= buyer._id
            buyerToken= generateToken({
                id: buyer._id,
                email: buyer.email,
                name: buyer.name,
                role: buyer.role
            })
            done()
        })
        .catch(err =>{
            console.log('error create user')
            console.log(err)
            done()
        })
})

after(async function() {
    await deleteUser()
    await deleteItem()

  });

describe.only('Function CRUD Item Test', function(){
    console.log("test-1")
    describe('Create item function test', function(){
        describe('POST /items', function(){
            this.timeout(5000)
            it('should send an object with 201 status code', (done) => {
                chai
                .request(app)
                .post('/items')
                .set('token', sellerToken)
                .attach('image', fs.readFileSync('test/iphonex.jpeg'), 'iphonex.jpeg')
                .field('name', 'iphoneX')
                .field('description','iphoneX produksi jepang')
                .field('price', '18000000')
                .field('stock', '5')
                .field('category', 'barang')
                .then((res) =>{
                    console.log("test-2")
                    itemId= res.body._id
                   

                    expect(res).to.have.status(201);
                    console.log(res.body, 'aaaaaaaaaaaaaaaaa')
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('stock');
                    done()
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        })
    })

    describe('Get details item function test', function(){
        describe('GET /items/:id', function(){
            it('should send an object with 200 status code', (done) => {
                console.log("test-3")
                chai
                .request(app)
                .get(`/items/${itemId}`)
                .set('token', sellerToken)
                .then((res) => {
                    expect(res).to.have.status(200);
                    // expect(res.body).to.be.an('array');
                    console.log(`/items/${itemId}`, 'get details')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    })

    describe('Get all item function test', function(){
        describe('GET /items', function(){
            it('should send an array with 200 status code', function(done) {
                chai
                .request(app)
                .get('/items')
                .then((res)=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    })
    
    
    describe('Update item function test', function(){
        describe('PUT /items/:id', function(){
            it('should send an object with 200 status code', function(done) {
                chai
                .request(app)
                .put(`/items/${itemId}`)
                .set('token', sellerToken)
                .send({name: 'Iphone X', description: 'produk apple keluaran terbaru'})
                .then((res) => {
                    console.log(itemId, '======')
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('stock');

                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    })
    
    describe('Update stock item function test', function(){
        describe('PATCH /items/:id', function(){
            it('should send an object with 200 status code', function(done) {
                chai
                .request(app)
                .patch(`/items/${itemId}`)
                .set('token', buyerToken)
                .send({amount:2})
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('stock');

                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    })

    //Validate Update Stock
    describe('Update stock item not found test', function(){
        describe('PATCH /items/:id', function(){
            it('should send an object with 200 status code', function(done) {
                chai
                .request(app)
                .patch(`/items/updatestock/5d35bf8e5d7a3f50d0bf3de1`)
                .set('token', buyerToken)
                .send({amount:2})
                .then((res) => {
                   // validate
                   expect(res).to.have.status(404);
                   expect(res.body).to.be.an('object');
   
                   done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    })
    
    
    describe('Delete item function test', function(){
        describe('DELETE /items/:id', function(){
            it('should send an object with 200 status code', function(done) {
                chai
                .request(app)
                .delete(`/items/${itemId}`)
                .set('token', sellerToken)
                .then(function(res){
                    expect(res).to.have.status(200);
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    
        //validate delete item
        describe('Invalid DELETE /items/:id', function(){
            it('should send an object with 404 status code', function(done) {
                chai
                .request(app)
                .delete('/items/5d35bf8e5d7a3f50d0bf3de1')
                .set('token', sellerToken)
                .then(function(res){
                    // validate
                    expect(res).to.have.status(404);
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    
    })
})



