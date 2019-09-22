
module.exports = (req, res, next)  => {
  if(req.user.role === 'admin') {
    next()
  } else {
    next({status: 401, message: 'Admin only !'})
  }
}