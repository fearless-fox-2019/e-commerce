module.exports = (req, res, next) => {
  if(req.user._id == req.params.userId) {
    next()
  } else {
    next({status: 400, message: 'unauthorized'})
  }
}