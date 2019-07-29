const chai = require('chai')
const chaiHtpp = require('chai-http')
const app = require('../app')

chai.use(chaiHtpp)
const expect = chai.expect
const { deleteProductTesting } = require('../helpers/deleteHelpers')
after(function(){
    deleteProductTesting()
  })

  let newProduct = {
      name : 'testing',
      description : 'ini product testing',
      image : 'pakai image ini dlu ya',
      price : '12345',
      category : 'testing',
      stock : '10'
  }

  describe('Product Section Test', function(){
    describe('POST /products/registerProduct', function(){
        it('should be send an object with status code : 201', function(done){
            chai.request(app).post('/products/registerProduct').send(newProduct)
            .then((res)=>{
                // user = res.body
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('image')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('category')
                expect(res.body).to.have.property('stock')
                done()
            })
            .catch((err) => {
                console.log(err)
            })
        })
    })
})