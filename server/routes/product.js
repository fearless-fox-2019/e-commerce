const router = require('express').Router()
const Product = require('../controllers/product')
const { authentication, authorization } = require('../middlewares/auth')
const images = require('../middlewares/image')

router.get('/', Product.getAll)
// router.use(authentication)
//find one buat detail product
router.get('/:id', Product.findOneDetails)
router.post('/',
    images.multer.single('image'), 
    images.sendUploadToGCS, 
    Product.create)
router.patch('/:id', Product.update)
router.delete('/:id', Product.delete)

module.exports = router