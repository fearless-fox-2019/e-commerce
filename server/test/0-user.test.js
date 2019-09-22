const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {removeAllUser, addUser} = require('../helpers/testHelper')
const app = require('../app');
chai.use(chaiHttp)


describe('register for /api/users/register', () => {
  after(async function() {
    await removeAllUser();
    console.log('database register cleared')
  })
  describe('Successfully register user', function () {
    this.timeout(10000)
    it('should create new user - (code: 201)', async function() {
      const data = {
        username : 'mantapjiwa',
        email: 'mantap@mail.com',
        password: 'password'
      }
      const response = await chai
        .request(app)
        .post('/api/users/register')
        .send(data);
      
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('_id')
      expect(response.body).to.have.property('username')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
      expect(response.body).to.have.property('role')
      expect(response.body.username).to.equal(data.username)
      expect(response.body.email).to.equal(data.email)
      expect(response.body.role).to.equal('user')
      expect(response).to.have.status(201);
    })
  })
  describe('Successfully register as admin', function() {
    it('should create new admin - (code: 201)', async function () {
      const data = {
        username : 'admin',
        email: 'admin@mail.com',
        password: 'password',
        role: 'admin'
      }
      const response = await chai
        .request(app)
        .post('/api/users/register')
        .send(data)

      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('_id')
      expect(response.body).to.have.property('username')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
      expect(response.body).to.have.property('role')
      expect(response.body.username).to.equal(data.username)
      expect(response.body.email).to.equal(data.email)
      expect(response.body.role).to.equal(data.role)
      expect(response).to.have.status(201);
    })
  })
  describe('error case', function () {
    it('should send error when input used username', async function () {
      const data = {
        username : 'mantapjiwa',
        email: 'ahsiap@mail.com',
        password: 'password'
      }
      const response = await chai
        .request(app)
        .post('/api/users/register')
        .send(data)
      
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('username already used!');
      expect(response).to.have.status(400);
    })
    
    it('should send error when input used email', async function () {
      const data = {
        username : 'ahsiap',
        email: 'mantap@mail.com',
        password: 'password'
      }
      const response = await chai
        .request(app)
        .post('/api/users/register')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('email already used!');
    })

    it('should send error when input invalid email', async function () {
      const data = {
        username: 'ahsiap',
        email: 'yoman',
        password: 'password'
      }
      const response = await chai
        .request(app)
        .post('/api/users/register')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('invalid email !');
    })

    it('should send error when input password less than 8', async function() {
      const data = {
        username: 'ahsiap',
        email: 'ahsiap@mail.com',
        password: 'ea'
      }
      const response = await chai
        .request(app)
        .post('/api/users/register')
        .send(data)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('password too short !');
    })
  })
})

describe('login for /api/users/login', function ()  {
  this.timeout(10000)
  before(async function() {
    await addUser();
    console.log('user added')
  })

  after(async function() {
    await removeAllUser();
    console.log('database cleared')
  })

  describe('successfully login user', () => {
    it('should send token and payload - (code: 200)', async function() {
      const data = {
        email: 'admin@admin.com',
        password: 'password'
      }

      const response = await chai
        .request(app)
        .post('/api/users/login')
        .send(data)

      expect(response).to.have.status(200)
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('token')
      expect(response.body).to.have.property('payload')
      expect(response.body.payload).to.have.property('_id')
      expect(response.body.payload).to.have.property('username')
      expect(response.body.payload).to.have.property('email')
      expect(response.body.payload).to.have.property('role')
      expect(response.body.payload.email).to.equal(data.email)
    })
  })

  describe('error case', () => {
    it('should send error when sending wrong email - (code : 400)', async function() {
      const data = {
        email: 'mantap@mantap.com',
        password: 'password'
      }

      const response = await chai
        .request(app)
        .post('/api/users/login')
        .send(data)
      
      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('wrong email / password');
    })
    it('should send error when sending wrong password - (code : 400)', async function() {
      const data = {
        email: 'admin@admin.com',
        password: 'akusukatesting'
      }

      const response = await chai
        .request(app)
        .post('/api/users/login')
        .send(data)
      
      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.include('wrong email / password');
    })
  })
})