module.exports = (err, req, res, next) => {
  console.log(err, 'err=================');
  if (err.name === 'ValidationError') {
      res.status(400).json({
          message: err.message
      });
  } else {
      let status = err.status || 500
      let msg = err.msg || 'Internal server error'

      res.status(status).json({
          message: msg,
      });
  }
}

// masih harus dibenerin