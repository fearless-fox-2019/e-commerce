const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {removeAllProduct} = require('../helpers/testHelper')
const app = require('../app');
chai.use(chaiHttp)

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM1ZTc5NzAwNzM1NjI5MTBkZTkxZDEiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NjM4MTM3ODMsImV4cCI6MTU2Mzg0OTc4M30.4j2i_IjUVnpPTR-w027S9L_Pwdz7aYZXGaf7lNCcg3U'
let productId = ''


describe('CRUD PRODUCT', function() {
  this.timeout(10000)
  after(async function() {
    await removeAllProduct()
    console.log('---- database product cleared ----')
  })

  describe('create product', () => {
    describe('successfully created product', () => {
      it('send an object - (code: 201)', async function() {
        const data = {
          name: 'kaos',
          description: 'kaos tapi celana',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .set('token', token)
          .send(data)

        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('description')
        expect(response.body).to.have.property('price')
        expect(response.body).to.have.property('stock')
        expect(response.body.name).to.equal(data.name)
        expect(response.body.price).to.equal(data.price)
        expect(response.body.stock).to.equal(data.stock)
        expect(response.body.description).to.equal(data.description)
        productId = response.body._id
      })
    })
    describe('error case', () => {
      it('send error when input empty or without name - (code : 400)', async function() {
        const data = {
          name: '',
          description: 'kaos tapi celana',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('name required !');
      })
      it('send error when input empty or without description - (code : 400)', async function() {
        const data = {
          name: 'kaos',
          description: '',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('description required !');
      })
      it('send error when input empty or without price - (code : 400)', async function() {
        const data = {
          name: 'kaos',
          description: 'kaos tapi celana',
          price: '',
          stock: 100
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('price required !');
      })
      it('send error when input empty or without stock - (code : 400)', async function() {
        const data = {
          name: 'kaos',
          description: 'kaos tapi celana',
          price: 70000,
          stock: ''
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('stock required !');
      })
      it('send error when input stock is a string - (code : 400)', async function() {
        const data = {
          name: 'kaos',
          description: 'kaos tapi celana',
          price: 70000,
          stock: '100'
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('gatau anjing wkwkkw');
      })
      it('send error when input stock is a string - (code : 400)', async function() {
        const data = {
          name: 'kaos',
          description: 'kaos tapi celana',
          price: '70000',
          stock: 100
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('gatau anjing wkwkkw');
      })
    })
  })

  describe('read products', () => {
    describe('successfully read products', () => {
      it('should send array of products - (code: 200)', async function() {
        const response = await chai
          .request(app)
          .get('/api/products')
        
        expect(response).to.have.status(200)
        expect(response).to.be.an('array')
      })
      it('should send product based on id - (code: 200)', async function() {
        const response = await chai
          .request(app)
          .get(`/api/products/${productId}`)

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('description')
        expect(response.body).to.have.property('price')
        expect(response.body).to.have.property('stock')
      })
    })
  })

  describe('update products', () => {
    describe('successfully update a product', () => {
      it('should update a product name - (code : 200)', async function() {
        const data = {
          name: 'kaos oblong',
          description: 'kaos tapi celana',
          price: 70000,
          stock: 100
        }
      })
    })
  })
})