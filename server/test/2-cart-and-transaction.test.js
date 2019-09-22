const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {removeAllUser, addUser, removeAllProducts, addProduct, removeAllCart, removeAllTransaction} = require('../helpers/testHelper')
const app = require('../app');
const fs = require('fs')
chai.use(chaiHttp)

let token = {
  admin : '',
  user: ''
}
let productId = ''
let cartId = ''
let transactionId = ''
let foto = fs.readFileSync("./test/kucing.jpg")
describe('get a token', function () {
  this.timeout(10000)
  before(async function() {
    await addUser()
    console.log('users registered')
  })

  describe('successfully login user', () => {
    it('should send admin token and payload - (code: 200)', async function() {
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
      token.admin = response.body.token
    })
    it('should send user token and payload - (code: 200)', async function() {
      const data = {
        email: 'mantap@mail.com',
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
      token.user = response.body.token
    })

  })
})

describe('make new product',  function () {
  this.timeout(1000000)
  it('send create a product - (code: 201)',  function(done) {
    const data = {
      name: 'kaos',
      description: 'kaos tapi celana',
      price: 70000,
      stock: 100
    }

    chai
    .request(app)
    .post('/api/products')
    .set('token', token.admin)
    .field('name', 'kaos')
    .field('description', 'kaos tapi celana')
    .field('price', '70000')
    .field('stock', '100')
    .attach("image", foto, "kucing.jpg")
    .end(function (err, response) {
        // testFunction.errorTest(err,res,401,"Not Authorized")   
        
        
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id')
        expect(response.body).to.have.property('name')
        expect(response.body).to.have.property('description')
        expect(response.body).to.have.property('price')
        expect(response.body).to.have.property('stock')
        expect(response.body).to.have.property('image')
        expect(response.body.name).to.equal(data.name)
        expect(response.body.price).to.equal(data.price)
        expect(response.body.stock).to.equal(data.stock)
        expect(response.body.description).to.equal(data.description)
        productId = response.body._id
        done();
    });
  })
})



describe('CART AND TRANSACTION', function() {
  this.timeout(10000)
  before(async function() {
    productId = await addProduct()
  })
  after(async function() {
    await removeAllProducts()
    await removeAllUser()
    await removeAllCart()
    await removeAllTransaction()
    console.log('----- database cleared -----') 
  })
  describe('CART', function()  {
    this.timeout(100000)
    describe('successfully add to cart', () => {
      it('should add product to cart - (code: 201)', async function() {
        const response = await chai
          .request(app)
          .post(`/api/carts`)
          .send({product : productId})
          .set('token', token.user)
        

  
        expect(response).to.have.status(201)
        expect(response).to.be.an('object')
        expect(response.body).to.have.property('_id')
        expect(response.body).to.have.property('products')
        expect(response.body).to.have.property('user')
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal(false)
        expect(response.body.products).to.be.an('array')
        
        cartId = response.body._id
      })
    })
    describe('error case', () => {
      it('should send error when inputing nonexistent product - (code: 404)', async function() {
        const response = await chai
          .request(app)
          .post('/api/carts')
          .send({product: 'ahsiap'})
          .set('token', token.user)
        

        expect(response.body).to.be.an('object');
        expect(response).to.have.status(404);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('product not found !');
      })
      it('should send error when inputing wrong token - (code: 400)', async function() {
        const response = await chai
          .request(app)
          .post('/api/carts')
          .send({product: productId})
          .set('token', 'ahsiap')

        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('you must login first');
      })
      it('should send error when add to cart without token - (code: 400)', async function() {
        const response = await chai
          .request(app)
          .post('/api/carts')
          .send({product: productId})

        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('you must login first');
      })
      it('should send error when add to cart with admin account - (code: 400)', async function() {
        const response = await chai
          .request(app)
          .post('/api/carts')
          .send({product: productId})
          .set('token', token.admin)

        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('user only !');
      })
      it('should send an error when read cart without token user - (code: 400)', async function() {
        const response = await chai
          .request(app)
          .get('/api/carts')
          
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('you must login first');
      })
    })
    describe('read all cart', () => {
      it('should send array of carts - (code : 200)', async () => {
        const response = await chai
          .request(app)
          .get('/api/carts')
          .set('token', token.user)
        
        expect(response.body).to.be.an('array')
        expect(response).to.have.status(200)
      })
    })
  })

  describe('TRANSACTION', function() {
    describe('successful transaction', () => {
      it('should make a transaction - (code : 200)', async function() {
       
        let data = {
          cart: cartId,
          address: 'jl haji muhi',
          courier: 'reguler'
        }
        const response = await chai
          .request(app)
          .post('/api/transactions')
          .send(data)
          .set('token', token.user)
       
        expect(response).to.have.status(201)
        expect(response).to.be.an('object')
        expect(response.body).to.have.property('_id')
        expect(response.body).to.have.property('cart')
        expect(response.body).to.have.property('address')
        expect(response.body).to.have.property('courier')
        expect(response.body.address).to.equal(data.address)
        expect(response.body.courier).to.equal(data.courier)
        transactionId = response.body._id
      })
    })
    describe('error case', () => {
      it('shold send an error when input without address - (code : 400)', async function() {
        let data = {
          cart: cartId,
          address: '',
          courier: 'reguler'
        }
        const response = await chai
          .request(app)
          .post('/api/transactions')
          .send(data)
          .set('token', token.user)

        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('address required !');
      })
      it('should send an error when input without courier - (code : 400)', async function() {
        let data = {
          cart: cartId,
          address: 'jl haji muhi',
          courier: ''
        }
        const response = await chai
          .request(app)
          .post('/api/transactions')
          .send(data)
          .set('token', token.user)

          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('errors');
          expect(response.body.errors).to.include('courier required !');
      })
      it('should send an error when input wrong or nonexistent cart - (code: 400)', async function() {
        let data = {
          cart: 'cartId',
          address: 'jl haji muhi',
          courier: 'reguler'
        }
        const response = await chai
          .request(app)
          .post('/api/transactions')
          .send(data)
          .set('token', token.user)


        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('cart not found !');
      })
      it('should send an error when input without token - (code: 400)', async function() {
        let data = {
          cart: cartId,
          address: 'jl haji muhi',
          courier: 'reguler'
        }
        const response = await chai
          .request(app)
          .post('/api/transactions')
          .send(data)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('you must login first');
      })
      it('should send an error when read transactions without token user - (code: 400)', async function() {
        const response = await chai
          .request(app)
          .get('/api/transactions')
          
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('you must login first');
      })
    })
    describe('read all transactions', () => {
      it('should send an array of transactions', async () => {
        const response = await chai
          .request(app)
          .get('/api/transactions')
          .set('token', token.user)

        expect(response.body).to.be.an('array')
        expect(response).to.have.status(200)
      })
    })
    describe('transaction should delivered', () => {
      it('should change transaction status to delivered - (code : 200)', async function () {
        const response = await chai 
          .request(app)
          .patch('/api/transactions/delivered/' + transactionId)
          .set('token', token.user)

        expect(response).to.have.status(200)
        expect(response).to.be.an('object')
        expect(response.body).to.have.property('_id')
        expect(response.body).to.have.property('cart')
        expect(response.body).to.have.property('address')
        expect(response.body).to.have.property('courier')
        expect(response.body.status).to.equal('delivered')
      })
    })
  })

  describe('UPDATE CART', function () {
    it('should successfully delete one product inside the cart - (code : 200)', async () => {
    
      const response = await chai
        .request(app)
        .patch('/api/carts/deleteProduct/' + cartId)
        .send({product: productId})
        .set('token', token.user)

    
      expect(response).to.have.status(200)
      expect(response).to.be.an('object')
    })
  })

  describe('delete cart', function () {
    it('should delete a cart based on id - (code : 200)', async () => {
      const response = await chai
        .request(app)
        .delete('/api/carts/deleteCart/' + cartId)
        .set('token', token.user)

      expect(response).to.have.status(200)
    })
  })
})