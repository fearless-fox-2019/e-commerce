const jwt = require("../helpers/jwt");
const User = require("../models/user");
const Cart = require("../models/cart");

function authenticate(req, res, next){
    try{
        const payload = jwt.verify(req.headers.token);
        req.headers.payload = payload;
        next();
    }catch(err){
        next({code: 401, message: "Unauthenticated: token is not valid"});
    }

}

function authorizedAdmin(req, res, next){
    
    if(req.headers.payload.role == "admin"){
        next();
    }else{
        next({code: 401, message: "Unathorized: you dont have privilege"});
    }
}

function authorizedUserCart(req, res, next){
    
    Cart.findById(req.params.id)
        .then((cart) => {
            if(cart.customerId == req.headers.payload.id){
                next();
            }else{
                next({code: 401, message: "Unathorized: you dont have privilege"});
            }
        });

}


module.exports = {
    authenticate,
    authorizedAdmin,
    authorizedUserCart
}