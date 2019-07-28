const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const fs = require("fs");
const {deleteAllItem} = require("../helpers/test");


chai.use(chaiHttp);
const expect = chai.expect;


let token, itemId;

describe("Items CRUD", function(){
    before(function(){
        deleteAllItem();
    });

    describe("Get token from login", function(){
        it("should send an OBJECT with 200 status code", function(done){
            chai.request(app)
                .post("/auth/login")
                .send({email: "lycan@mail.com", password: "lycanpass"})
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    token = res.body.token;
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });

    describe("POST /items", function(){
        it("should send an OBJECT with 201 status code", function(done){
            chai.request(app)
                .post("/items")
                .set("token", token)
                .attach("image", fs.readFileSync("./test/oneplus7pro.png"), "oneplus7pro.png")
                .field("name", "Oneplus 7 Pro")
                .field("price", 11500000)
                .field("stock", 22)
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    itemId = res.body.id;
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });

    describe("PUT /items/:id", function(){
        it("should be an OBJECT with 200 status code", function(done){
            chai.request(app)
                .put(`/items/${itemId}`)
                .set("token", token)
                .field("price", 11000000)
                .field("stock", 16)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(){
                    done(err);
                });
        });
    });

    describe("GET /items", function(){
        it("should be an OBJECT with 200 status code", function(done){
            chai.request(app)
                .get("/items")
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });

    describe("GET /items/:id", function(){
        it("should be an OBJECT with 200 status code", function(done){
            chai.request(app)
                .get(`/items/${itemId}`)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });

    describe("DELETE /items/:id", function(){
        it("should be an OBJECT with 200 status code", function(done){
            chai.request(app)
                .delete(`/items/${itemId}`)
                .set("token", token)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });
});