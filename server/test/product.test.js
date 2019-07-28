const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {deleteProductData} = require('../helpers/deleteData')

chai.use(chaiHttp);

after(function(done) {
  deleteProductData(done);
});
//========== Create ==========
describe('CRUD for product', ()=>{
  describe('create product', ()=>{
    it('should create new product - status code: 201', ()=>{
      let input = {
        name : 'kucing persia',
        description : 'sudah vaksin pernah vaksin',
        price: 1000000,
        stock : 100
      }

      chai
      .request(app)
      .post('/api/products/create')
      .send(input)
      .then(res =>{
        // expect(res).to.have.status(201)
        // expect(res.body).to.be.an('object')
        // expect(res.body).to.have.property('_id')
        // expect(res.body).to.have.property('name')
        // expect(res.body).to.have.property('email')
        // expect(res.body).to.have.property('password')
        // expect(res.body.name).to.equal(input.name)
        // expect(res.body.email).to.equal(input.email)
        done()
      })
      .catch(err =>{
        console.log(err)
      })
    })
  })
})