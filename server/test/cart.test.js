const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
chai.use(chaiHttp);

let token = null
let loggined = null
describe('/carts', function() {
//     before(function() {

//         chai
//         .request(app)
//         .post('/users/login')
//         .send({
//             email : `zahfriska@gmail.com`,
//             password : `1234`
//         })
//         .then(function(res){
//             token = res.body.token
//             expect(res).to.have.status(200);
//             // expect(res.body).to.be.an('object')
            
//             loggined = res.body
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     })
// console.log(token), "loginn <<<<<<<<<<<<<<<<<<";

    describe('POST /users/login', function(){
        it(`should send an object of inserted user with 200 status code`,function(done){
            const newUser = {
                email: 'zahfriska@gmail.com',
                password: '1234'
            }
            chai
            .request(app)
            .post('/users/login')
            .send(newUser)
            .end(function(err,res){
                user = res.body
                token = res.body.token
                console.log(token, "ini token");
                
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('_id');
                // expect(res.body).to.have.property('firstName');
                // expect(res.body).to.have.property('lastName');
                // expect(res.body).to.have.property('email');
                // expect(res.body).to.have.property('token');
                // expect(res.body.email).to.equal(newUser.email);
                // expect(res.body.message).to.equal(
                //     `logged in`
                // )
                done()
            })
        })
    })
    
    describe('POST /carts/add', function(){
        it('should return a new cart for user - code(201)', function(done){
            chai.request(app)
            .post('/carts/add')
            .set({token : token})
            .send({
                ProductId : "5d3586e82029f150e7658869",
                quantity : 2
            })
            .end(function(err, res){
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                // expect(res.body).to.have.property('_id');
                done()
            })
        })
        it('should send error,  (Bad Request, token is wrong, code: 400)', function(done){
            chai.request(app)
            .post('/carts/add')
            .set({token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"})
            .send({
                ProductId : "5d3586e82029f150e7658869",
                quantity : 2})
            .end(function(err, response){
                console.log("ini ke execute");
                
                expect(response).to.have.status(400);
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('message');
                // expect(response.body.err).to.be.an('array');
                done()
            })
        })
    })
})


