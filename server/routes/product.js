const productRouter = require('express').Router(),
    productController = require('../controllers/product'),
    multer = require('multer'),
    gcsMiddlewares = require('../middleware/google-cloud-storage'),
    path = require('path')

let upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5*1024*1024
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase()
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})


productRouter.get('/', productController.findAll)
productRouter.get('/:productId', productController.findOne)
productRouter.post('/', upload.single('file'), gcsMiddlewares.sendUploadToGCS, productController.create)
productRouter.put('/:productId', productController.replace)
productRouter.patch('/:productId', productController.update)
productRouter.delete('/:productId', productController.deleteOne)

module.exports = productRouter