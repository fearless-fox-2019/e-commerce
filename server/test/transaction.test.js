const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

let expect = chai.expect

describe('Transactions TEST', function(){
    describe('POST /transactions', function(){})
    describe('GET /transactions', function(){})
    describe('GET /transactions/:transactionId', function(){})
    describe('PATCH /transactions/:transactionId', function(){})
    describe('DELETE /transactions/:transactionId', function(){})
})