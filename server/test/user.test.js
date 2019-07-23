const chaiHttp = require('chai-http')
const chai = require('chai')
const app = require('../app')
const {deleteUser} = require('../helpers/test')
chai.use(chaiHttp)
const expect = chai.expect



after(async function(){
   await deleteUser()
})

describe('User', function(){
    describe('ROUTE /register', function(){
        describe('Success Case', function(){
            it('success create admin, should send status code 201', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ 
                    username : 'fadlulazmi', 
                    email : 'fadlulazmi@mail.com', 
                    password : '1234', 
                    role : 'admin'
                  })
                 .then(result => {
                  // console.log(result)
                    ID = result.body._id
                    expect(result).to.have.status(201)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('_id')
                    expect(result.body).to.have.property('username')
                    expect(result.body).to.have.property('email')
                    expect(result.body).to.have.property('password')
                    expect(result.body).to.have.property('role')
                    expect(result.body.username).to.equal('fadlulazmi')
                    expect(result.body.email).to.equal('fadlulazmi@mail.com')
                    expect(result.body.role).to.equal('admin')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('success create customer, should send status code 201', function(done){
               chai
                .request(app)
                .post('/user/register')
                .send({ 
                     username : 'customers', 
                     email : 'customers@mail.com', 
                     password : '1234'
                  })
                .then(result => {
                 // console.log(result)
                   ID = result.body._id
                   expect(result).to.have.status(201)
                   expect(result.body).to.be.an('Object')
                   expect(result.body).to.have.property('_id')
                   expect(result.body).to.have.property('username')
                   expect(result.body).to.have.property('email')
                   expect(result.body).to.have.property('password')
                   expect(result.body).to.have.property('role')
                   expect(result.body.username).to.equal('customers')
                   expect(result.body.email).to.equal('customers@mail.com')
                   expect(result.body.role).to.equal('customer')
                   done()
                })
                .catch(err => {
                   console.log(err)
                })
           })
        })
        describe('Error Case', function(){
            it('duplicate email, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : 'fadlulazmi', email : 'fadlulazmi@mail.com', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('Email has been registered')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('invalid email format, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : 'lala', email : 'lalamail.com', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('Invalid email format')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('meet minimum password length, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : 'lala', email : 'lala@mail.com', password : '123'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('minimum password length 4')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('username contain space, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : 'la la', email : 'lala@mail.com', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal("username can't contain space")
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('empty username field, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : '', email : 'lala@mail.com', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('username is required')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('username contain special character, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : '^%$$^%)*^%', email : 'lala@mail.com', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal("username can't contain special characters")
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('empty email field, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : 'lala', email : '', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('email is required')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('empty password field, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/register')
                 .send({ username : 'lala', email : 'lala@mail.com', password : ''})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('password is required')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
        })
    }) 
    describe('ROUTE /login', function(){
        describe('Success Case', function(){
            it('success, should send status code 200', function(done){
                chai
                 .request(app)
                 .post('/user/login')
                 .send({ email : 'fadlulazmi@mail.com', password : '1234'})
                 .then(result => {
                    expect(result).to.have.status(200)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('access_token')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
        })
        describe('Error Case', function(){
            it('empty email field, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/login')
                 .send({email : '', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('email is required')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('empty password field, should send status code 400', function(done){
                chai
                 .request(app)
                 .post('/user/login')
                 .send({email : 'fadlul@mail.com', password : ''})
                 .then(result => {
    
                    expect(result).to.have.status(400)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('password is required')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('wrong email, should send status code 404', function(done){
                chai
                 .request(app)
                 .post('/user/login')
                 .send({email : 'adlul@mail.com', password : '1234'})
                 .then(result => {
    
                    expect(result).to.have.status(404)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('invalid email / password')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
            it('wrong password, should send status code 404', function(done){
                chai
                 .request(app)
                 .post('/user/login')
                 .send({email : 'fadlul@mail.com', password : '12345'})
                 .then(result => {
    
                    expect(result).to.have.status(404)
                    expect(result.body).to.be.an('Object')
                    expect(result.body).to.have.property('message')
                    expect(result.body.message).to.equal('invalid email / password')
                    done()
                 })
                 .catch(err => {
                    console.log(err)
                 })
            })
        })
    })
})
