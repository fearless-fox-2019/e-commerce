const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const {deleteAllUser, makeAdmin} = require("../helpers/test");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Users CRUD", function(){
    describe("POST /auth/register", function(){
        before(function(){
            deleteAllUser();
        });

        it("should send an OBJECT with 201 status code", function(done){
            chai.request(app)
                .post("/auth/register")
                .send({email: "lycan@mail.com", username: "Lycan Jr", password: "lycanpass"})
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");

                    makeAdmin("lycan@mail.com");

                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });
    });

    describe("POST /auth/login", function(){

        it("should send an OBJECT with 200 status code (SUCCEED)", function(done){
            chai.request(app)
                .post("/auth/login")
                .send({email: "lycan@mail.com", password: "lycanpass"})
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });


        it("should send an OBJECT with 401 status code (WRONG PASSWORD)", function(done){
            chai.request(app)
                .post("/auth/login")
                .send({email: "lycan@mail.com", password: "lycanpasswrong"})
                .then(function(res){
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.an("object");
                    done();
                })
                .catch(function(err){
                    done(err);
                })
        });
    })
});