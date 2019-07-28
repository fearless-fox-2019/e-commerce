const router = require('express').Router()
const ControllerProduct = require('../controllers/products')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const gcsUpdate = require('../middlewares/gcsUpdate')
const _multer = require('multer')
const gcsMiddleware = require('../middlewares/storage')
const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.get('/', ControllerProduct.findAll)
router.get('/:id', ControllerProduct.findOne)
router.use(authentication)
router.use(authorizeAdmin)
router.post('/', multer.single('image'), gcsMiddleware.sendUploadToGCS, ControllerProduct.create)
// router.post('/', ControllerProduct.create)
router.put('/:id', multer.single('image'), gcsUpdate.sendUploadToGCS, ControllerProduct.update)
router.delete('/delete/:id', ControllerProduct.delete)


module.exports = router