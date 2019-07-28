const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication').authentication
const authorization = require('../middlewares/authorization').authorization
const images = require('../helpers/file')

router.get('/findAll', ProductController.findAll)
router.get('/findOne/:id', ProductController.findOne)
router.use(authentication)
router.post('/create', images.multer.single('file'), images.sendUploadToGCS, ProductController.create)
// router.post('/googleCloudStorage', 
//     images.multer.single('file'), 
//     images.sendUploadToGCS,
//     (req,res,next)=>{
//       console.log(req.file, "=================")
//         let imageLink = req.file.cloudStoragePublicUrl
//         console.log(imageLink)
//         res.status(200).json(imageLink)
//     }
// )

module.exports = router