module.exports = function(err, req, res, next) {
    const stringifiedErr = JSON.stringify(err);
    if (err.code === 404) {
      res.status(err.code).json({
        message: err.resource + ' not found',
      });
    } else if (err.code === 400) {
      res.status(err.code).json({
        message: err.message
      })
    } else if (err.code === 401) {
      res.status(err.code).json({
        message: err.message
      })
    } else if (err.code === 403) {
      res.status(err.code).json({
        message: err.message
      })
    } else if (stringifiedErr.indexOf('ValidatorError') !== -1) {
      const error = err.errors

      if (error.email) {
        let message = error.email.message
        res.status(400).json({ message });
      }

      if (error.password) {
        let message = error.password.message
        res.status(400).json({ message });
      }

      if (error.name) {
        let message = error.name.message
        res.status(400).json({ message });
      }

      if (error.address) {
        let message = error.address.message
        res.status(400).json({ message });
      }

      if (error.balance) {
        let message = error.balance.message
        res.status(400).json({ message });
      }

      if (error.img) {
        let message = error.img.message
        res.status(400).json({ message });
      }

      if (error.description) {
        let message = error.description.message
        res.status(400).json({ message });
      }

      if (error.price) {
        let message = error.price.message
        res.status(400).json({ message });
      }

      if (error.stock) {
        let message = error.stock.message
        res.status(400).json({ message });
      }
  
    } else if (stringifiedErr.indexOf('E11000') !== -1) {
      let errors = null;
  
      if (stringifiedErr.indexOf('email') !== -1) {
        errors = ['Email is already in use'];
      }
  
      res.status(400).json({ errors });
  
    } else {
      console.log(err);
  
      res.status(500).json({
        message: 'Internal server error, check the console',
      });
    }
  };