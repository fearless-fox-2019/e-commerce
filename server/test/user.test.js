const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
chai.use(chaiHttp);

const {deleteUser}= require('../helpers/deleteDb')

const expect = chai.expect;

after(function() {
    deleteUser()
  });

describe('Testing For Function Register and Login User ',  function(){

    describe('Register function test', function(){
        //test register new user
        describe('POST /users/register', function(){
            it('should send an object with 201 status code', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({name: 'Ana', email:'ana@mail.com', password: 'ana', role: 'admin'})
                .then((res)=>{
                    // validate
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    expect(res.body).to.have.property('role');
                    expect(res.body.name).to.equal('Ana')
                    expect(res.body.email).to.equal('ana@mail.com')
                    expect(res.body.password).to.not.be.eql('ana')
                    expect(res.body.role).to.equal('admin')
    
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
        //Test duplicate email
        describe('Duplicate email', function() {
            it('should throw an error when the email is duplicate', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({name: 'Ana', email:'ana@mail.com', password: 'ana', role:'admin'})
                .then((res) => {
                    // validate
                    console.log(res.body.message)
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
    
                    //validation new user error email has been used
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: email: Email has been used')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        })
    
        //Test validate email
        describe('Validate email format', function() {
            it('should throw an error when the email is invalid format', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({name: 'Ana', email:'anamail.com', password: 'ana', role:'admin'})
                .then((res) => {
                    // validate
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
    
                    //validation new user email input is not valid
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: email: Input is not a valid email')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
        });

        //Test property name is required
        describe("Validate property name can't be null", function(){
            it('should send an object with 500 status code', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({email:'anam@mail.com', password: 'ana', role: 'admin'})
                .then((res) => {
                    // validate
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: name: Name required')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })    })
        })

        //Test property email is required
        describe("Validate property email can't be null", function(){
            it('should send an object with 500 status code', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({name:'Ana', password: 'ana', role: 'admin'})
                .then((res) => {
                    // validate
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: email: email required')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })    })
        })

        //Test property password is required
        describe("Validate property password can't be null", function(){
            it('should send an object with 500 status code', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({name:'Ana', email:'aname@mail.com', role: 'admin'})
                .then((res) => {
                    // validate
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('User validation failed: password: password required')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })    })
        })

         //Test default value role
         describe("Test Default value customer", function(){
            it('should send an object with 201 status code', function(done) {
                chai
                .request(app)
                .post('/users/register')
                .send({name:'Ana', email:'anamei@mail.com', password:'ana'})
                .then((res) => {
                    // validate
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    expect(res.body).to.have.property('role');
                    expect(res.body.name).to.equal('Ana')
                    expect(res.body.email).to.equal('anamei@mail.com')
                    expect(res.body.password).to.not.be.eql('ana')
                    expect(res.body.role).to.equal('customer')
    
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })    })
        })
    })

    describe('Login function test', function(){
        describe('POST /users/login', function(){
            it('should send an object with 200 status code', function(done) {
                chai
                .request(app)
                .post('/users/login')
                .send({email: 'ana@mail.com', password: 'ana'})
                .then((res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('token');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('userId');
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
           
        })

        describe('Validate wrong email', function(){
            it('should send an object with 404 status code', function(done) {
                chai
                .request(app)
                .post('/users/login')
                .send({email: 'anam@mail.com', password: 'ana'})
                .then((res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Wrong Email/Password')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
           
        })

        describe('Validate wrong password', function(){
            it('should send an object with 404 status code', function(done) {
                chai
                .request(app)
                .post('/users/login')
                .send({email: 'ana@mail.com', password: 'anam'})
                .then((res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object');
    
                    //validation new user have been save to database
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Wrong Email/Password')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
            })
           
        })
    })
    
    
})


