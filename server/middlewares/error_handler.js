module.exports = function(err, req, res, next){
    const errCode = err.code || 500;
    const errMessage = err.message || "Internal Server Error";
    const errDetail = err || "";

    console.log("\n\nERROR HANDLER");
    console.log("========================");
    console.log(errDetail);
    console.log("========================\n\n");

    res.status(errCode).json({code: errCode, message: errMessage});
}