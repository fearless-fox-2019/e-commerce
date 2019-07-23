const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const deleteAllUser = require("../helpers/test/deleteAllUser");
const deleteAllItem = require("../helpers/test/deleteAllItem");

chai.use(chaiHttp);
const expect = chai.expect;

let token, itemId;


describe("User's CRUD", function(){
    describe("POST /auth/register", function(){
        it("should send an object with 201 status code", function(done){
            chai
                .request(app)
                .post("/auth/register")
                .send({email: "lycan@mail.com", username: "Lycan Jr", password: "lycanpass"})
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });
    describe("POST /auth/login", function(){
        after(function() {
            deleteAllUser();
        });
        it("should send an object with 200 status code", function(done){
            chai
                .request(app)
                .post("/auth/login")
                .send({email: "lycan@mail.com", password: "lycanpass"})
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                })
        })
    })
});


describe("Item's CRUD", function(){
    after(function(){
        deleteAllItem();
    });
    describe("POST /items", function(){
        it("should send an object with 201 status code", function(done){
            chai
                .request(app)
                .post("/items")
                .send({name: "Oneplus 7 Pro", description: "Snapdragon Octa Core, 12GB RAM, 256GB ROM", price: 11500000, stock: 25})
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    itemId = res.body._id;
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });
    describe("GET /items", function(){
        it("should send an array with 200 status code", function(done){
            chai
                .request(app)
                .get("/items")
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                })
                .catch(function(err){
                    done(err);
                })
        });
    });
    describe("GET /items/:id", function(){
        it("should send an object with 200 status code", function(done){
            chai
                .request(app)
                .get(`/items/${itemId}`)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                })
        })
    });
    describe("PUT /items/:id", function(){
        it("should send an object with 200 status code", function(done){
            chai
                .request(app)
                .put(`/items/${itemId}`)
                .send({price: 11000000, stock: 20})
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done()
                })
                .catch(function(err){
                    done(err);
                })
        })
    })
})