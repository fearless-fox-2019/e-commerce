const router = require('express').Router()
const userController = require('../controllers/userController')
const {
    authentication,
    authorization
} = require('../middlewares/auth')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.post('/signin/google', userController.googleSignin)
// router.get('/getuser/:userid',userController.getById)

router.use('/', authentication)

router.get('/whoami', userController.whoami)
router.patch('/addWishlist/:itemId', userController.addWishlist)
router.patch('/removeFromWishlist/:itemId', userController.removeFromWishlist)
router.patch('/addToCart/:itemId', userController.addToCart)
router.patch('/removeFromCart/:itemId', userController.removeFromCart)

module.exports = router