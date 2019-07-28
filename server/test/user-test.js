const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deleteUsers')

chai.use(chaiHttp)

after(function(done) {
  deleteAll(done)
});

describe('User signin/Register', function(){
  describe('POST /users/signup', function() {
    var token
    it('should send status code 201 and successfully registered ', function(done){
        chai
            .request(app)
            .post('/api/users/signup')
            .send({username: 'ehehehe', email: 'reza@gmail.com', password: '1234567'})
            .then(function(res){
                // console.log(res.body,"=============")
                expect(res.body).to.be.an('object')
                // console.log(res.body, 'iniiii res.body')
                // console.log(res.body.role)
                token = res.body.access_token
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('access_token')
                expect(res.body.username).to.equal('ehehehe')
                
                
                // expect(res.body).to.have.property('_id')
                // expect(res.body).to.have.property('email')
                // expect(res.body).to.have.property('password')
                // expect(res.body)
                // expect(res.body.email).to.equal('reza@gmail.com');
                // expect(res.body.password).to.equal('12345')

           
                done()
            })
            .catch(error=>{
                console.log(error)
            })
            
    })
    it('should send status code 200  and successfully login ', function(done){
      chai
          .request(app)
          .post('/api/users/signin')
          .send({username: 'ehehehe', password: '1234567'})
          .then(function(res){
              // console.log(res.body,"=============")
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('username')
              expect(res.body.username).to.equal('ehehehe')
              expect(res).to.have.status(200)
              done()
          })
          .catch(error=>{
              console.log(error)
          })
          
  })
  it('should send status code 200 and successfully verify ', function(done){
    chai
        .request(app)
        .get(`/api/users/confirmation/${token}`)
        .send({})
        .then(function(res){
          // console.log(token)
            console.log(res.body,"=============")
            expect(res.body).to.equal('your account now verified')
            expect(res).to.have.status(200)
            done()
        })
        .catch(error=>{
            console.log(error)
        })
        
})
    it('should send a validation format email is wrong', function(done) {
      chai
        .request(app)
        .post('/api/users/signup')
        .send({username: 'ehehehe', email: 'rez.adf.com', password: '1234567'})
        .then(function(res) {
            console.log(res.body,"=======================================")
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.equal('Error: Validator failed for path `email` with value `rez.adf.com`')
          // console.log(res.body.message, 'asdkjasdlads')
          // console.log(res.message, 'ajskdjasldasd')
          done()
        })
        .catch((err) => {
          // console.log(err)
        })
    })
    it('should send a validation format password is wrong', function(done) {
      chai
        .request(app)
        .post('/api/users/signup')
        .send({username: 'ehehehejejjeje', email: 'lalalala@gmail.com', password: '1234'})
        .then(function(res) {
            console.log(res.body,"=======================================")
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.equal('Error: password length must be more than 6 characters!')
          // console.log(res.body.message, 'asdkjasdlads')
          // console.log(res.message, 'ajskdjasldasd')
          done()
        })
        .catch((err) => {
          // console.log(err)
        })
    })
    it('should send a validation email has been used', function(done) {
      chai
        .request(app)
        .post('/api/users/signup')
        .send({username: 'ehehehehehehe', email: 'reza@gmail.com', password: '1234567'})
        .then(function(res) {
          expect(res).to.have.status(400)
          // expect(res.body).to.be.an('object')
          console.log(res.body," disini valid email")
          expect(res.body).to.equal(`email_1 : "reza@gmail.com" already exist`)
          done()
        })
        .catch((err) => {
          // console.log(err)
        })
    })
    it('should send username has been used', function(done) {
      chai
        .request(app)
        .post('/api/users/signup')
        .send({username: 'ehehehe', email: 'lolo@mail.com', password: '1234567'})
        .then(function(res) {
          expect(res).to.have.status(400)
          console.log(res.body)
          // expect(res.body).to.be.an('object')
          // console.log(res.body.message, 'asd')
          expect(res.body).to.equal(`username_1 : "ehehehe" already exist`)
          done()
        })
        .catch((err) => {
          // console.log(err);
        })
    })
    it('should return username is required', function(done) {
      chai
        .request(app)
        .post('/api/users/signup')
        .send({email: 'hahaha@mail.com', password: '1234567'})
        .then(function(res) {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          // console.log(res.body.message, 'hei hei')
          expect(res.body.message).to.equal(`Error: username is empty`)
          done()
        })
        .catch((err) => {
          // console.log(err)
        })
    })
    it('should return email is required', function(done) {
      chai
      .request(app)
      .post('/api/users/signup')
      .send({username: 'asdfasfadsf', password: '12345678'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        console.log(res.body.message, 'hei hei')
        expect(res.body.message).to.equal(`Error: email is empty`)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
    })
    it('should return password is required', function(done) {
      chai
      .request(app)
      .post('/api/users/signup')
      .send({email: 'tom@mail.com', username: 'adslkfjasfd' , role: 'admin'})
      .then(function(res) {
        expect(res).to.have.status(400)
        expect(res.body).to.be.an('object')
        // console.log(res.body.message, 'hei hei')
        expect(res.body.message).to.equal(`Error: password is empty`)
        done()
      })
      .catch((err) => {
        // console.log(err)
      })
    })
//   describe('POST /users/signin', function() {
//     it('should return status 404 of not found', function(done) {
//       chai
//       .request(app)
//       .post('/api/users/signin')
//       .send()
//       .then(function(res) {
//         expect(res).to.have.status(404)
//         expect(res.body).to.be.an('object')
//         expect(res.body.message).to.equal('not found')
        
//         done()
//       })
//       .catch((err) => {
//         // console.log(err)
//       })
//     })
    it('should return email/password is wrong', function(done) {
      chai
      .request(app)
      .post('/api/users/signin')
      .send({email: '', password: '1235678'})
      .then(function(res) {
        // expect(res).to.have.status(404)
        // console.log(res.body.code,"disinii")
        // expect(res.body).to.be.an('object')
        // console.log(res.body,"passs")
        expect(res.body).to.equal('Invalid username/password')
        done()
      })
      .catch((err) => {
        // console.log(err)
      })
    })
    it('should return email/password is wrong', function(done) {
      chai
      .request(app)
      .post('/api/users/signin')
      .send({email: 'asd@mail.com', password: ''})
      .then(function(res) {
        expect(res.body).to.equal('Invalid username/password')
        done()
      })
      .catch((err) => {
        // console.log(err)
      })
    })
  })

})

const expect = chai.expect