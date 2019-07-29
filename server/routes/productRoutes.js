const router = require('express').Router()
const productController = require('../controllers/productController')
const { authenticate } = require('../middlewares/authentication')
const { authorizationAdmin } = require('../middlewares/authorization')
const upload = require('../helpers/images') //masih belum berfungsi

router.get('/',productController.getAll)
router.get('/:productId',productController.getOne)
router.post('/registerProduct', productController.registerProduct)

router.use(authenticate)

router.post('/', authorizationAdmin, upload.multer.single('image'),upload.sendUploadToGCS,productController.registerProduct)
router.patch('/:productId', authorizationAdmin, upload.multer.single('image'),upload.sendUploadToGCS,productController.updateProduct)
router.patch('/:productId/updateStock', authorizationAdmin, productController.updateStock)
router.delete('/:productId', authorizationAdmin,productController.delete)

module.exports = router
