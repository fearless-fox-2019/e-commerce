const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect
const { deleteUserTesting } = require('../helpers/deleteHelpers')
after(function(){
    deleteUserTesting()
  })

let newUser = {
    email : 'testing@mail.com',
    username : 'testing',
    password : 'testing'
}

describe('User Section Test', function(){
    describe('POST /users/register', function(){
        it('should be send an object with status code : 201', function(done){
            chai.request(app).post('/users/register').send(newUser)
            .then((res)=>{
                // user = res.body
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('username')
                expect(res.body).to.have.property('password')
                done()
            })
            .catch((err) => {
                console.log(err)
            })
        })
    })
})

describe('Login function test', function(){
    describe('POST /users/login', function(){
        it('should send an object with 200 status code', function(done) {
            chai.request(app).post('/users/login').send(newUser)
            .then((res) => {
                // console.log(res.body)
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('id');
                done()
            })
            .catch(function(err){
                console.log(err)
            })
        })
    })
})

//next, test validasi user admin atau bukan