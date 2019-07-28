const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
chai.use(chaiHttp);

let productId = null
let product = null
let body = null

describe('/products', function(){
    // 
    describe('POST /products', function(){
        it('should create a new products - (code: 201)', function(done){
            
            let newProduct = {
                productname : 'njnijnjnui',
                price : 1500000,
                qty : 3
            }
             chai.request(app)
            .post('/products')
            .send(newProduct)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('productname');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('qty');
                done()

                body = res.body
                productId = res.body._id
            })
            // console.log(body, "teststttttttststsyst");
            
        })
    })

    describe('GET /products', function(){
        it('should return all the products - code (200)', function(done){
            chai.request(app)
            .get('/products')
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done()
                expect(res.body).to.be.an('array')
                product = res.body

                console.log("ini productnya", product);
                
            })
        })
    })

    describe('DELETE /products/:id', function(){
        it('should delete the product by their ID - code (200)', function(done){
            chai.request(app)
            .delete('/products/' +productId)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done()
            })
        })
    })
    
})