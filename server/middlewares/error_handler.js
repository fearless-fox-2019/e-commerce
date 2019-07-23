

module.exports = function(err, req, res, next){
    console.log(err);
    
    const errorCode = err.code || 500;
    const errorMessage = err.message || "Internal server error";

    req.status(errorCode).json({errorMessage});
}