const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

let expect = chai.expect

describe('Items TEST', function(){
    describe('POST /items', function(){
        describe(`Succes Case`,function(){
            it('should send an object with status code 200 -- succes create item', function(done){})
        })
        describe(`Error Case`,function(){
            it('should send an object with status code 400 -- required "itemname" field', function(done){})
            it('should send an object with status code 400 -- required "description" field', function(done){})
            it('should send an object with status code 400 -- required "image" field', function(done){})
            it('should send an object with status code 400 -- required "price" field', function(done){})
            it('should send an object with status code 400 -- required "stock" field', function(done){})
            it('should send an object with status code 400 -- required "category" field', function(done){})
            it('should send an object with status code 400 -- required "tags" field', function(done){})
            it('should send an object with status code 401 -- unauthorized user', function(done){})
            it('should send an object with status code 401 -- unauthenticate user', function(done){})
            it('should send an object with status code 500 -- internal server error', function(done){})
        })
    })
    describe('GET /items', function(){
        describe(`Succes Case`,function(){
            it(`should send an object with status code 200 -- success get all item`, function(done){})
        })
        describe(`Error Case`,function(){
            it(`should send an object with status code 404 -- data not found`, function(done){})
            it(`should send an object with status code 500 -- internal server error`, function(done){})
        })
    })
    describe('GET /items/:itemId', function(){
        describe(`Succes Case`,function(){
            it(`should send an object with status code 200 -- success get a data`, function(done){})
        })
        describe(`Error Case`,function(){
            it(`should send an object with status code 404 -- data not found`, function(done){})
            it(`should send an object with status code 500 -- internal server error`, function(done){})
        })
    })
    describe('PATCH /items/:itemId', function(){
        describe(`Succes Case`,function(){
            it(`should send an object with status code 200 -- success get a data`, function(done){})
        })
        describe(`Error Case`,function(){
            it(`should send an object with status code 404 -- data not found`, function(done){})
            it(`should send an object with status code 404 -- data not found`, function(done){})
            it(`should send an object with status code 500 -- internal server error`, function(done){})
        })
    })
    describe('DELETE /items/:itemId', function(){
        describe(`Succes Case`,function(){
            it(`should send an object with status code 200 -- success get a data`, function(done){})
        })
        describe(`Error Case`,function(){
            it(`should send an object with status code 404 -- data not found`, function(done){})
            it(`should send an object with status code 404 -- data not found`, function(done){})
            it(`should send an object with status code 500 -- internal server error`, function(done){})
        })
    })
})