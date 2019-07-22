const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const request = chai.request
let createdProductId
chai.use(chaiHttp)

let input = {
  name: 'kaos', 
  price: 70000,
  description: 'kaos tapi celana',
  stock: 200
}



// ------------ CREATE --------------
describe('create product from /api/products', () => {
  describe('Success create new product', () => {
    it('send an object with status code : 200', (done) => {
      let input = {
        name: 'kaos', 
        price: 70000,
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).post('/api/products').send(input)
      .then(res => {
        expect(res.status).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.all.keys('name', 'price', 'description', 'stock')
        for(let i in input) {
          expect(res.body[i]).to.equal(input[i])
          expect(typeof res.body[i]).to.be.an(typeof input[i])
        }
        createdProductId = res.body._id
        done()
      })
      .catch(res => {console.log(res)})
    })
  })
  describe('error case', () => {
    it('send a 400 status error code when sending wrong data type ', (done) => {
      let input = {
        name: 0, 
        price: 70000,
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).post('/api/products').send(input)
      .then(res=> {
        expect(res).to.have.status(400)
      })
      .catch(res=> {
        
        expect.fail(res.message)
        done()
      })
    })
    it('send an error status 400 when creating product with empty name', (done) => {
      let input = {
        name: '', 
        price: 70000,
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).post('/api/products').send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('send an error status 400 when creating product with empty price or 0', (done) => {
      let input = {
        name: 'kaos', 
        price: '',
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).post('/api/products').send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('send an error status 400 when creating product without description', (done) => {
      let input = {
        name: 'kaos', 
        price: 70000,
        stock: 200
      }
      chai.request(app).post('/api/products').send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('send an error status 400 when creating product without price', (done) => {
      let input = {
        name: 'kaos',
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).post('/api/products').send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('send an error status 400 when creating product without stock', (done) => {
      let input = {
        name: 'kaos', 
        price: 70000,
        description: 'kaos tapi celana',
        
      }
      chai.request(app).post('/api/products').send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('send an error status 400 when creating product without name', (done) => {
      let input = { 
        price: 70000,
        description: 'kaos tapi celana',
        stock: 200
      }
      request(app).post('/api/products').send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
  })
})
// ----------READ-------------
describe('read product from /api/products', () => {
  describe('success read all products from database', () => {
    it('send an array of object with status code 200', (done) => {
      chai.request(app).get('/api/products')
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res).to.have.status(200)
      })
      .catch(res=>{console.log(res)})
    })
  })
})

// ----------- EDIT ---------------
describe('edit product from /api/products', () => {
  describe('Success edit', () => {
    it('Send status code 200 with object', (done) => {
      let input = {
        name: 'kaos oblong', 
        price: 70000,
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).put('/api/products/' + createdProductId).send(input)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.be.an('object')
        expect(res.body).to.have.all.keys('name', 'price', 'description', 'stock')
        for(let i in input) {
          expect(res.body[i]).to.equal(input[i])
          expect(typeof res.body[i]).to.be.an(typeof input[i])
        }
        done()
      })
      .catch(res => {console.log(res)})
    })
  })
  describe('error case', () =>  {
    it('Send status code 400 when sending empty name', (done) => {
      let input = {
        name: '', 
        price: 70000,
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).put('/api/products/' + createdProductId).send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('Send status code 400 when sending empty price', (done) => {
      let input = {
        name: 'kaos', 
        price: '',
        description: 'kaos tapi celana',
        stock: 200
      }
      chai.request(app).put('/api/products/' + createdProductId).send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('Send status code 400 when sending empty description', (done) => {
      let input = {
        name: 'kaos', 
        price: 70000,
        description: '',
        stock: 200
      }
      chai.request(app).put('/api/products/' + createdProductId).send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
    it('Send status code 400 when sending empty stock', (done) => {
      let input = {
        name: 'kaos', 
        price: 70000,
        description: 'kaos tapi celana',
        stock: ''
      }
      chai.request(app).put('/api/products/' + createdProductId).send(input)
      .then(res=>{})
      .catch(res=> {
        expect(res).to.have.status(400)
        expect.fail(res.message)
        done()
      })
    })
  })
})

describe('delete product from /api/products', () => {
  describe('success delete product', () => {
    it('send status code 200 with message', () => {
      chai.request(app).delete('/api/products/delete/' + createdProductId)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
      })
      .catch(res => console.log(res))
    })
  })
})
