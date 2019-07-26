const router= require('express').Router()
const itemController= require('../controllers/itemController')
const authentication= require('../middlewares/authenticate')
const {authorizeAdmin}= require('../middlewares/authorize')
const {sendUploadToGCS, multer } = require('../helpers/image')

router.get('/', itemController.findAll)
router.get('/:category', itemController.findCategory)
router.use(authentication)
router.get('/:id', itemController.findOne)
router.post('/', authorizeAdmin, multer.single('image'), sendUploadToGCS, itemController.create)
router.put('/:id', authorizeAdmin,  multer.single('image'), sendUploadToGCS, itemController.updateItem)
router.patch('/:id', itemController.updateStock)
router.delete('/:id', authorizeAdmin, itemController.remove)

module.exports= router