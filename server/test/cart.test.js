const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const fs = require("fs");
const {deleteAllItem} = require("../helpers/test");

chai.use(chaiHttp);
const expect = chai.expect;

let token, itemId, cartId;

describe("Carts CRUD", function(){
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
                .field("name", "Oneplus 7 Pro First")
                .field("price", 10500000)
                .field("stock", 10)
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

    describe("POST /carts", function(){
        it("should send an OBJECT with 201 status code", function(done){
            chai.request(app)
                .post("/carts")
                .set("token", token)
                .send({itemId: itemId, quantity: 2})
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    cartId = res.body.id;
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });

    describe("DELETE /carts/:id", function(){
        it("should send an OBJECT with 200 status code", function(done){
            chai.request(app)
                .delete(`/carts/${cartId}`)
                .set("token", token)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        })
    });

})