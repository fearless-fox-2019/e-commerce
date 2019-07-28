const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {removeAllUser, addUser, removeAllProducts} = require('../helpers/testHelper')
const deleteGCS = require('../helpers/deleteGCS')
const app = require('../app');
const fs = require('fs')
chai.use(chaiHttp)

let foto = fs.readFileSync("./test/kucing.jpg")

let token = {
  admin : '',
  user: ''
}
let productId = ''


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




describe('CRUD PRODUCT', function() {
  this.timeout(50000)
  after(async function() {
    await removeAllUser()
    await removeAllProducts()
    console.log('---- database cleared ----')
  })
  
  describe('create product', () => {
    // after(async function() {
    //   await deleteGCS('kucing.jpg')
    //   console.log('foto deleted')
    // })
    describe('successfully created product', () => {
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
    describe('error case', () => {
      it('should send error unauthorized when inputting token that have no admin role - (code : 401)', async function() {
        const data = {
          name: 'kaos',
          description: 'kaos tapi celana',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .post('/api/products')
          .set('token', token.user)
          .field('name', 'kaos')
          .field('description', 'kaos tapi celana')
          .field('price', '70000')
          .field('stock', '100')
          .attach("image", foto, "kucing.jpg")

        expect(response).to.have.status(401)
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('Admin only !');
      })
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
          .set('token', token.admin)
          .field('name', '')
          .field('description', 'kaos tapi celana')
          .field('price', '70000')
          .field('stock', '100')
          .attach("image", foto, "kucing.jpg")
          
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
        .set('token', token.admin)
        .field('name', 'kaos')
        .field('description', '')
        .field('price', '70000')
        .field('stock', '100')
        .attach("image", foto, "kucing.jpg")
          
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
        .set('token', token.admin)
        .field('name', 'kaos')
        .field('description', 'kaos tapi celana')
        .field('price', '')
        .field('stock', '100')
        .attach("image", foto, "kucing.jpg")
          
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
        .set('token', token.admin)
        .field('name', 'kaos')
        .field('description', 'kaos tapi celana')
        .field('price', '70000')
        .field('stock', '')
        .attach("image", foto, "kucing.jpg")
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('stock required !');
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
        expect(response.body).to.be.an('array')
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

        const response = await chai
          .request(app)
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('nModified')
        expect(response.body).to.have.property('ok')
        expect(response.body.nModified).to.equal(1)
        expect(response.body.ok).to.equal(1)
      })
      it('should update a product description - (code: 200)', async function() {
        const data = {
          name: 'kaos oblong',
          description: 'kaos supreme kw',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('nModified')
        expect(response.body).to.have.property('ok')
        expect(response.body.nModified).to.equal(1)
        expect(response.body.ok).to.equal(1)
      })
      it('should update a product price  - (code: 200)', async function() {
        const data = {
          name: 'kaos oblong',
          description: 'kaos supreme kw',
          price: 100000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('nModified')
        expect(response.body).to.have.property('ok')
        expect(response.body.nModified).to.equal(1)
        expect(response.body.ok).to.equal(1)
      })
      it('should update a product description stock - (code: 200)', async function() {
        const data = {
          name: 'kaos oblong',
          description: 'kaos supreme kw',
          price: 70000,
          stock: 120
        }

        const response = await chai
          .request(app)
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
        
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('nModified')
        expect(response.body).to.have.property('ok')
        expect(response.body.nModified).to.equal(1)
        expect(response.body.ok).to.equal(1)
      })
    })
    describe('error case', () => {
      it('should send error unauthorized when inputting token that have no admin role - (code : 401)', async function() {
        const data = {
          name: 'kaos oblong',
          description: 'kaos tapi celana',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .put(`/api/products/${productId}`)
          .set('token', token.user)
          .send(data)

        expect(response).to.have.status(401)
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('Admin only !');
      })
      it('send error when input empty or without name - (code : 400)', async function() {
        const data = {
          name: '',
          description: 'kaos tapi celana',
          price: 70000,
          stock: 100
        }

        const response = await chai
          .request(app)
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
          
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
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
          
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
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
          
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
          .put(`/api/products/${productId}`)
          .send(data)
          .set('token', token.admin)
          
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.include('stock required !');
      })
    })
    describe('updating image', () => {
      // after(async function() {
      //   await deleteGCS('kucing.jpg')
      //   await deleteGCS('anime.jpg')
      //   console.log('image from bucket deleted')
      // })
      describe('successfully created product', () => {
        it('send an object - (code: 201)',  function(done) {
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
      describe('successfully updating image', () => {
        it("should update product's image (code : 200)", async function() {
          let foto = fs.readFileSync("./test/anime.jpg")
          const response = await chai
            .request(app)
            .put(`/api/products/${productId}`)
            .set('token', token.admin)
            .field('name', 'kaos')
            .field('description', 'kaos tapi celana')
            .field('price', '70000')
            .field('stock', '100')
            .attach("image", foto, "anime.jpg")
          
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('nModified')
          expect(response.body).to.have.property('ok')
          expect(response.body.nModified).to.equal(1)
          expect(response.body.ok).to.equal(1)
        })
      })
    })
  })

  describe('delete products', () => {
    describe('successfully delete a product', () => {
      it('should delete a product - (code : 200)', async function() {
        const response = await chai
          .request(app)
          .delete(`/api/products/delete/${productId}`)
          .set('token', token.admin)

        expect(response).to.have.status(200)
      })
    })
  })
})