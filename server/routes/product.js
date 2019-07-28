const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productCon')
const { Authentication ,AdminAuthorization } = require('../middlewares/auth')
const uploadToGCS = require('../middlewares/upload')
const Multer = require('multer');
const path = require('path')

const multer = Multer({
    storage: Multer.memoryStorage(),
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          cb({code: 400, message: "Image only with ext png, jpg, jpeg & gif"})
      } else  {
        cb(null, true)
      }
    },
    limits: {
      fileSize: 4900000
    }
});

Router.get('/', productController.list)
Router.get('/:id', productController.findOne)
Router.patch('/updatestock/:id', productController.updateStock)
Router.use(Authentication)
Router.post('/', AdminAuthorization, multer.single('img'), uploadToGCS, productController.create)
Router.patch('/image/:id', AdminAuthorization, multer.single('img'), uploadToGCS, productController.updateImage)
Router.patch('/woimage/:id', AdminAuthorization, productController.updateImage)
Router.delete('/:id', AdminAuthorization, productController.delete)

module.exports = Router;