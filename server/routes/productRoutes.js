const router = require('express').Router()
const productController = require('../controllers/productController')
const image = require('../helpers/image.js')
const authentication = require('../middlewares/authetication')

router.post('/', authentication, image.multer.single('image'), image.sendUploadToGCS, productController.newProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProducts)
router.delete('/:id', productController.deleteProduct)
router.get('/new', productController.listNew)

module.exports = router