module.exports = (req, res, next) => {
  if(req.user.role == 'user') {
    next()
  } else {
    next({status: 400, message: 'user only !'})
  }
}