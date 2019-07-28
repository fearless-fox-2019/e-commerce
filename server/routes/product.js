const { ControllerUser, ControllerProduct } = require('../controllers/index');
const routes = require('express').Router()
const { authentication , authorization } = require('../middlewares/auth');
const images = require('../helpers/gcs')

routes.get('/all', ControllerProduct.all)
routes.post('/create-test', ControllerProduct.createTest)
routes.post('/create', authentication, authorization, images.multer.single('file'), images.sendUploadToGCS, ControllerProduct.create)
routes.patch('/update/:id', authentication, authorization, images.multer.single('file'), images.sendUploadToGCS, ControllerProduct.update)
routes.delete('/delete/:id', authentication, authorization, ControllerProduct.destroy)


module.exports = routes
