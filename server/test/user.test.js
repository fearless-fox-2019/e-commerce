// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const { clearUser } = require('../helpers/clearDb')

// chai.use(chaiHttp)

// before(function(done) {
//     clearUser(done)
// })

// after(function(done) {
//     clearUser(done)
// })

// describe('Auth Test', function() {

//     let _id = null

//     let newUser = {
//         name: 'nopita',
//         email: 'nopita@mail.com',
//         password: 'password'
//     }
//     describe('POST - Success', function() {

//         describe('/register', function() {
//             it('should send an object with status code 201', function(done) {
//                 chai
//                     .request(app)
//                     .post('/users/register')
//                     .send(newUser)
//                     .then((res)=> {
//                         id = res.body._id
                        
//                         expect(res).to.have.status(201)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('_id')
//                         expect(res.body).to.have.property('email')
//                         expect(res.body).to.have.property('password')
//                         expect(res.body.name).to.equal(newUser.name)
//                         expect(res.body.email).to.equal(newUser.email)
//                         expect(res.body.password).to.not.equal(newUser.password)
//                         done()
//                     })
//                     .catch((err)=> {
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/login', function() {
//             it('should send an object accesstoken with status code 200', function(done) {
//                 chai
//                 .request(app)
//                 .post('/users/login')
//                 .send({
//                     email: newUser.email,
//                     password: newUser.password
//                 })
//                 .then((res)=> {
//                     expect(res).to.have.status(200)
//                     expect(res.body).to.have.property('accesstoken')
//                     done()
//                 })
//                 .catch((err)=>{
//                     console.log(err)
//                 })
//             })
//         })
//     })

//     describe('POST - Failed', function() {
        
//         describe('/register - field passsword empty', function() {
//             it('should send an password validation error message with status code 403', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/register')
//                     .send({
//                         name: newUser.name,
//                         email: newUser.email,
//                         password: ''
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(403)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('User validation failed: password: Password is required')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/register - field email empty', function () {
//             it('should send an email validation error message with status code 403', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/register')
//                     .send({
//                         name: newUser.name,
//                         email: '',
//                         password: newUser.password
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(400)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('Email is required')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/register - field name empty', function () {
//             it('should send an name validation error message with status code 403', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/register')
//                     .send({
//                         name: '',
//                         email: newUser.email,
//                         password: newUser.password
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(403)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('User validation failed: name: Name is required')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/register - Email not valid', function () {
//             it('should send an email validation error message with status code 400', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/register')
//                     .send({
//                         name: newUser.name,
//                         email: 'nopi@em',
//                         password: newUser.password
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(400)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('Email is not valid email address')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/register - Email has been taken', function () {
//             it('should send an email validation error message with status code 409', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/register')
//                     .send({
//                         name: newUser.name,
//                         email: newUser.email,
//                         password: newUser.password
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(409)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('Email has been taken')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/login - Wrong password', function () {
//             it('should send an error message with status code 401', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/login')
//                     .send({
//                         email: newUser.email,
//                         password: ''
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(401)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('Wrong password')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })

//         describe('/login - User not found', function () {
//             it('should send an error message with status code 404', function (done) {
//                 chai
//                     .request(app)
//                     .post('/users/login')
//                     .send({
//                         email: '',
//                         password: newUser.password
//                     })
//                     .then((res)=> {
//                         expect(res).to.have.status(404)
//                         expect(res.body).to.be.an('Object')
//                         expect(res.body).to.have.property('message')
//                         expect(res.body.message).to.equal('User not found')
//                         done()
//                     })
//                     .catch((err)=>{
//                         console.log(err)
//                     })
//             })
//         })
//     })


// })