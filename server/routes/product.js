const router = require('express').Router()
const productController = require ('../controllers/productController')
const images = require('../helpers/gcshelper')
const auth = require('../middlewares/authent');
// router.post('/upload', images.multer.single('image'), images.sendUploadToGCS,
  // (req, res) => {
  //   res.send({
  //     status: 200,
  //     message: 'Your file is successfully uploaded',
  //     link: req.file.cloudStoragePublicUrl
  //   })
  // })
router.post('/',auth, images.multer.single('image'), images.sendUploadToGCS, productController.create)
router.get('/', productController.read)
router.delete('/:id',auth, productController.delete)
router.put('/:id',auth, images.multer.single('image'), images.sendUploadToGCS, productController.updatePut)
router.patch('/:id',auth, productController.update)

module.exports = router