const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product-controller');
const { isAdmin } = require('../middlewares/authorize');
const upload = require('../middlewares/upload');
const Authentication = require('../middlewares/authenticate');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.post('/', isAdmin, upload.multer.single('image'), upload.sendUploadToGCS,ProductController.create);
router.put('/:id', isAdmin, upload.multer.single('image'), upload.sendUploadToGCS, ProductController.update);
router.delete('/:id', isAdmin, ProductController.destroy);

module.exports = router;