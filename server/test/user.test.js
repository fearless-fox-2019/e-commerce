const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {
    userDelete,
    createUser
} = require('../helpers/testHelper')

chai.use(chaiHttp)

let expect = chai.expect

var newUser = {
    username: 'yuda',
    email: 'yuda@mail.com',
    password: '121212',
    role: 'customer'
}
describe.skip(`Users TEST`, function () {
    describe(`POST /users/signup`, function () {
        describe(`Success case`, function () {
                it(`should send an object with status code 201`, function (done) {
                    userDelete()
                    console.log(newUser, '=-=-=-=-=-=-=-=-=-=')
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            console.log(res.body)
                            expect(res).to.have.status(201)

                            expect(res.body).to.be.an('object')

                            expect(res.body).to.have.property('_id')
                            expect(res.body).to.have.property('username')
                            expect(res.body).to.have.property('password')
                            expect(res.body).to.have.property('email')
                            expect(res.body).to.have.property('role')
                            expect(res.body).to.have.property('cart')
                            expect(res.body).to.have.property('wishlist')
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup succes case ==-')
                        })
                })
            }),
            describe(`Error case`, function () {
                it(`should send an object with status code 400 --- required username`, function (done) {
                    newUser.username = undefined
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors.username.message).to.equal('required username')
                            newUser.username = 'yuda'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup failed case - required username =-')
                        })
                })
                it(`should send an object with status code 400 --- required password`, function (done) {
                    newUser.password = undefined
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors.password.message).to.equal('required password')
                            newUser.password = '121212'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup failed case - required password =-')
                        })
                })
                it(`should send an object with status code 400 --- invalid password length`, function (done) {
                    newUser.password = '1212'
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors.password.message).to.equal('password too short')
                            newUser.password = '121212'

                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup failed case - password too short =-')
                        })
                })
                it(`should send an object with status code 400 --- required email`, function (done) {
                    newUser.email = undefined
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors.email.message).to.equal('required email')
                            newUser.email = 'yuda@mail.com'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup failed case - required email =-')
                        })
                })
                it(`should send an object with status code 400 --- invalid email format`, function (done) {
                    newUser.email = 'yudamailcom'
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors.email.message).to.equal('invalid email format')
                            newUser.email = 'yuda@mail.com'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup failed case - invalid email format =-')
                        })
                })
                it(`should send an object with status code 400 --- email has been used`, function (done) {
                    createUser(newUser)
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(400)
                            expect(res.body).to.be.an('object')
                            expect(res.body.errors.email.message).to.equal('email has been used')
                            userDelete()
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, '-== from user signup failed case - email has been used =-')
                        })
                })
            })
    })
    describe(`POST /users/signin`, function () {
        describe(`Success case`, function () {
                before(function () {
                    createUser(newUser)
                })
                it(`should send an object with status code 200 -- success`, function (done) {
                    chai
                        .request(app)
                        .post(`/users/signin`)
                        .send(newUser)
                        .then(function (res) {
                            expect(res).to.have.status(200)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('token')
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, `-= error from success signin test =-`)
                        })
                })
            }),
            describe(`Error case`, function () {
                it('should send an object with status code 404 -- invalid username / email', function (done) {
                    newUser.username = 'yud'
                    newUser.email = undefined
                    chai
                        .request(app)
                        .post(`/users/signin`)
                        .send(newUser)
                        .then(function (res) {
                            // console.log(res.body,'ini harusnya enggak punya token')
                            expect(res).to.have.status(404)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.equal('invalid username / email / password')
                            newUser.username = 'yuda'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, `-= error from success signin test =-`)
                        })
                })
                it('should send an object with status code 404 -- email / username not found', function (done) {
                    newUser.username = undefined
                    newUser.email = undefined
                    chai
                        .request(app)
                        .post(`/users/signin`)
                        .send(newUser)
                        .then(function (res) {
                            console.log(res.body, 'ini loh disini')
                            expect(res).to.have.status(404)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.equal('invalid username / email / password')
                            newUser.username = 'yuda'
                            newUser.email = 'yuda@mail.com'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, `-= error from success signin test =-`)
                        })
                })
                it('should send an object with status code 404 -- invalid password', function (done) {
                    newUser.password = '1212'
                    chai
                        .request(app)
                        .post(`/users/signin`)
                        .send(newUser)
                        .then(function (res) {
                            console.log(res.body, 'ini loh disini')
                            expect(res).to.have.status(404)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.equal('invalid username / email / password')
                            newUser.password = '121212'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, `-= error from success signin test =-`)
                        })
                })
                it('should send an object with status code 404 -- password not found', function (done) {
                    newUser.password = undefined
                    chai
                        .request(app)
                        .post(`/users/signin`)
                        .send(newUser)
                        .then(function (res) {
                            console.log(res.body, 'ini loh disini')
                            expect(res).to.have.status(500)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('message')
                            expect(res.body.message).to.equal('Internal server error')
                            newUser.username = 'yuda'
                            done()
                        })
                        .catch(function (err) {
                            console.log(err, `-= error from success signin test =-`)
                        })
                })
            })
    })
    describe('GET /users/getuser/:userid',function(){})

})