const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const deleteUser = require('../helpers/test')
chai.use(chaiHttp);

after(async function() {
    await deleteUser()
    console.log('user deleted')
})

describe.skip('Users, SIGNUP (POST /users/signup)', function() {
    // ERROR WITHOUT NAME
    describe('ERROR WITHOUT NAME', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: '', email: 'elia@mail.com', password: 'elia1234', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Please input a name')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR WITHOUT EMAIL
    describe('ERROR WITHOUT EMAIL', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: '', password: 'elia1234', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Please input your email')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR INVALID EMAIL
    describe('ERROR INVALID EMAIL', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: '@mail.com', password: 'elia1234', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Please input a valid email')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR WITHOUT PASSWORD
    describe('ERROR WITHOUT PASSWORD', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: 'elia@mail.com', password: '', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Please input a password')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR PASSWORD LENGTH < 8
    describe('ERROR PASSWORD LENGTH < 8', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: 'elia@mail.com', password: 'elia', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                // expect(res.body.message).to.equal(`Path 'password' ('${res.body.password}') is shorter than the minimum allowed length (8).`)
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR WITHOUT ADDRESS
    describe('ERROR WITHOUT ADDRESS', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: 'elia@mail.com', password: 'elia1234', address: '', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Please input your address')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR WITHOUT BALANCE
    describe('ERROR WITHOUT BALANCE', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: 'elia@mail.com', password: 'elia1234', address: 'Gading Serpong', balance: null})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Please input balance')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // SUCCESS
    describe('SUCCESS', function() {
        it('should send an object with 201 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: 'elia@mail.com', password: 'elia1234', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('address')
                expect(res.body).to.have.property('balance')
                done()
            })
            .catch(function(err) {
                console.log(err)
            })
        })
    })

    // ERROR DUPLICATE EMAIL 
    describe('ERROR DUPLICATE EMAIL', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signup')
            .send({ name: 'Elia Victor', email: 'elia@mail.com', password: 'elia1234', address: 'Gading Serpong', balance: 100000})
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Email already registered!')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });
})

describe.skip('Users, SIGNIN (POST /users/signin)', function() {

    // SUCCESS
    describe('SUCCESS', function() {
        it('should send an object with 200 status code', function(done) {
            chai
            .request(app)
            .post('/users/signin')
            .send({ email: 'elia@mail.com', password: 'elia1234' })
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('access_token')
                done()
            })
            .catch(function(err) {
                console.log(err)
            })
        })
    });

    // ERROR WITHOUT EMAIL
    describe('ERROR WITHOUT EMAIL', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signin')
            .send({ email: '', password: 'elia1234' })
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal('Please input an email')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR EMAIL NOT REGISTERED
    describe('ERROR EMAIL NOT REGISTERED', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signin')
            .send({ email: 'dedi@mail.com', password: 'elia1234' })
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(404)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal('User not found')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR WITHOUT PASSWORD
    describe('ERROR WITHOUT PASSWORD', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signin')
            .send({ email: 'elia@mail.com', password: '' })
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal('Please input a password')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });

    // ERROR WRONG PASSWORD
    describe('ERROR WRONG PASSWORD', function() {
        it('should send an object with 400 status code', function(done) {
            chai
            .request(app)
            .post('/users/signin')
            .send({ email: 'elia@mail.com', password: 'elia' })
            .then(function(res) {
                // Assertion
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal('Invalid email / password')
                done();
            })
            .catch(function(err) {
                console.log(err);
            });
        });
    });
})

