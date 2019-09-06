const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
chai.use(chaiHttp);

let userEmail = null, userPassword = null, UserId=null
let dataDeleted = null //bisa kek gini kalo mau ambil semua datanya
let login = null
let error = null

describe('/users', function(){
    describe('POST /users/register', function(){
        it('should create a new user - (code: 201)', function(done){
            let newUser = {
                firstname : `Bruno`,
                lastname : `Major`,
                email : `halo@mail.com`,
                password : `1234`
            }

            chai.request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');
                done()

                UserId = res.body._id
                userEmail = res.body.email
                userPassword = res.body.password
            })
        })
    })

    describe('POST /users/register', function(){
        it('error validation email - (code: 400)', function(done){
            let newUser = {
                firstname : `Bruno`,
                lastname : `Major`,
                email : `halo@mail.com`,
                password : `1234`
            }
            chai.request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res){
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('errors');
                done()
                error = res.body
                console.log(error, "ini errorr");  
            })
        })
    })
    
    describe('POST /users/register', function(){
        it('error validation email - (code: 400)', function(done){
            let newUser = {
                firstname : `Bruno`,
                lastname : `Major`,
                email : `majormail.com`,
                password : `1234`
            }
            chai.request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res){
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('errors');
                expect(res.body.message).to.equal('User validation failed: email: Email is invalid')
                done()
                error = res.body
                console.log(error, "ini errorr");  
            })
        })
    })

    describe('POST /users/register', function(){
        it('error firstname is required - (code: 400)', function(done){
            let newUser = {
                firstname : ``,
                lastname : `Major`,
                email : `majormail.com`,
                password : `1234`
            }
            chai.request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res){
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('errors');
                expect(res.body.message).to.equal('User validation failed: firstname: Firstname can\'t be empty, email: Email is invalid')
                done()
                error = res.body
                console.log(error, "ini errorr");  
            })
        })
    })

    describe('POST /users/register', function(){
        it('error lastname is required - (code: 400)', function(done){
            let newUser = {
                firstname : `bruno`,
                lastname : ``,
                email : `majo123@mail.com`,
                password : `1234`
            }
            chai.request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res){
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('errors');
                expect(res.body.message).to.equal('User validation failed: lastname: Lastname can\'t be empty')
                done()
                error = res.body
                console.log(error, "ini errorr");  
            })
        })
    })

    describe('POST /users/login', function(){
        it(`should return success login - code(200)`, function(done){
            let user = {
                email : userEmail,
                password : userPassword
            }

            chai.request(app)
            .post('/users/login')
            .send(user)
            .end(function(err, res){
                // expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.data).to.have.property('_id');
                expect(res.body.data).to.have.property('email');
                expect(res.body.data).to.have.property('firstname');
                expect(res.body.data).to.have.property('lastname');
                expect(res.body).to.have.property('token')
                login = res.body
                done()
                
            })
        })
    })


    
    
    describe('DELETE /users/:id', function(){
        it('should deleted the user - code(200)', function(done){
            chai.request(app)
            .delete('/users/' +UserId)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done()

                dataDeleted = res.body
            })
        })
    })

})