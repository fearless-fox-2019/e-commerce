const router = require('express').Router()
const userController = require ('../controllers/userController')
const auth = require('../middlewares/authent');

router.post('/signin', userController.signin)
router.post('/signup',userController.signup)
router.patch('/cart', auth, userController.cart)
router.get('/findById',auth,userController.findById)

module.exports = router