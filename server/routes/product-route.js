const express = require("express")
const router = express.Router()
const productController = require("../controllers/product-controller")
const images = require('../helpers/images')
const authenticate = require('../middlewares/authenticate')
// const authorization = require('../middlewares/authorizations')
// router.use(authenticate)
router.post("/", productController.create)
router.post('/upload',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })
router.put("/stock/:id", productController.updateStock)
router.get("/", productController.get)
router.get("/:id", productController.getOne)
router.delete("/:id",productController.destroy)

router.put("/:id",productController.update)
router.use(authenticate)
router.post("/size", productController.addSize)


module.exports = router