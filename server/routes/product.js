const route = require('express').Router();
const ProductController = require('../controllers/productController');
const { multer, sendUploadToGCS } = require('../helpers/image');
const { authentication, productAuthorization } = require('../middlewares/auth');

route.get('/', ProductController.listProduct);
route.get('/:id', ProductController.detailProduct);

route.use(authentication);

route.post('/', productAuthorization, multer.single('image'), sendUploadToGCS, ProductController.addProduct);
route.patch('/:id', productAuthorization, multer.single('image'), sendUploadToGCS, ProductController.updateProduct);
route.delete('/:id', productAuthorization, ProductController.deleteProduct);

module.exports = route;