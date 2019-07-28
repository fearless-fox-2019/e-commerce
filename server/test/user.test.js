const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {deleteUserData} = require('../helpers/deleteData')

chai.use(chaiHttp);

after(function(done) {
  deleteUserData(done);
});
//========== Register ==========
describe('register for /api/users/register', ()=>{
  describe('success register new user', ()=>{
    it('should create new user - status code: 201', (done)=>{
      let input = {
        name: 'qwer',
        password: 'qwer',
        email: 'qwer@mail.com',
      }

      chai
        .request(app)
        .post('/api/users/register')
        .send(input)
      .then(res =>{
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
        expect(res.body.name).to.equal(input.name)
        expect(res.body.email).to.equal(input.email)
        done()
      })
      .catch(err =>{
        console.log(err)
      })
    })
  })
  describe('error case', ()=>{
    it('should send error when input invalid email format - status code: 500', (done)=>{
      let input = {
        name: 'asdf',
        password: 'asdf',
        email: 'asdf'
      }
      chai 
        .request(app)
        .post('/api/users/register')
        .send(input)
      .then(res =>{
        expect(res).to.have.status(500) //status Code Belum 400
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
    it('should send error when email has been used - status code: 500', (done)=>{
      let input = {
        name: 'qwer',
        email: 'qwer@mail.com',
        password: 'qwer'
      }
      chai
        .request(app)
        .post('/api/users/register')
        .send(input)
      .then(res => {
        expect(res).to.have.status(500) //status code belum 400
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
    it('should send error when password is null', (done)=>{
      let input = {
        name: 'qwer',
        email: '1234@mail.com',
        password: null
      }
      chai
        .request(app)
        .post('/api/users/register')
        .send(input)
      .then(res =>{
        expect(res).to.have.status(500) //status code belum 400
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        done()
      })
      .catch(err => {
        console.log(err)
      })
    })
  })
})

// ========== Login ==========
describe('login for /api/users/login', ()=>{
  describe('login success', ()=>{
    it('send and object with status code: 200', (done)=>{
      let input = {
        name: 'qwer',
        password: 'qwer',
        email: 'qwer@mail.com',
      }
      chai
        .request(app)
        .post('/api/users/login')
        .send(input)
      .then(res =>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.equal('qwer')
        done()
      })
      .catch(err =>{
        console.log(err)
      })
    })
  })
  describe('error case', ()=>{
    it('should send error when input wrong password', (done)=>{
      let input = {
        name: 'qwer',
        password: 'asdf',
        email: 'qwer@mail.com'
      }
      chai
        .request(app)
        .post('/api/users/login')
        .send(input)
      .then(res => {
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        done()
      })
      .catch(err =>{
        console.log(err)
      })
    })
    it("should send error when email is not exist", (done)=>{
      let input = {
        name: 'qwer',
        password: 'qwer',
        email: 'asd@mail.com'
      }
      chai
        .request(app)
        .post('/api/users/login')
        .send(input)
      .then(res => {
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body.message)
        done()
      })
      .catch(err =>{
        console.log(err)
      })
    })
  })
})


