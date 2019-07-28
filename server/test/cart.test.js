const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app.js')

const deleteAll = require('../helpers/deleteCart')

chai.use(chaiHttp)
const expect = chai.expect

after(function(done) {
  deleteAll(done)
});

describe('CART CRUD', function() {
  describe('POST CART', function() {
    it('should send an object with status code 201 and successfully created a new cart based on user', function(done) {
      chai
        .request(app)
        .post('/api/cart/')
        .send({name: 'Air Jordan '})
          .then(function(res) {
            console.log('yoyooy')
            done()
          })
          .catch(error => {
            console.log(error)
          })
    }) 
  })
})