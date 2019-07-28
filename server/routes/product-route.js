const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    multer,
    getPublicUrl,
    sendUploadToGCS
} = require("../middlewares/images")

const ProductController = require('../controllers/product-controller')

router.use(auth.authentication)

router.get('/', ProductController.getAllproducts)
router.post('/', multer.single('image'), sendUploadToGCS, ProductController.create)
router.get('/:productId', ProductController.findOne)
router.put('/edit/:productId', ProductController.update)
router.delete('/delete/:productId', ProductController.delete)

module.exports = router