const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const deleteAllUser = require('../helpers/deleteAllUsers')
const expect = chai.expect

chai.use(chaiHttp)

after(function () {
    deleteAllUser()
})

describe('User SIGNUP AND SIGNIN', function () {
    // SIGNUP
    describe('POST /signup then POST /signin', function () {
        it('should return an object with status code 201', function (done) {
            chai
                .request(app)
                .post('/users/signup')
                .send({
                    username: 'scum',
                    email: 'scum@mail.com',
                    password: 'scumdotcom'
                })
                .then(function (res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('username')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')

                    return chai
                        .request(app)
                        .post('/users/signin')
                        .send({
                            email: 'scum@mail.com',
                            password: 'scumdotcom'
                        })
                    // done()
                })
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('string')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })


})