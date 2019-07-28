const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

const expect = chai.expect

chai.use(chaiHttp)

describe('CREATE & DELETE CART', function () {

    describe('POST /users/cart/:productId', function (done) {
        chai
            .request(app)
            .post(`/users/cart/5d35d7ee7e4f0e2973a3bb57`)
            .set('decode', {
                "id": '5d35f41520222d59ca2dc9b9'
            })
            .then(function (res) {
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('productId')
                expect(res.body).to.have.property('status')
            })
            .catch(err => {
                console.log(err)
            })

    })

})