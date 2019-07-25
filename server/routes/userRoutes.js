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
router.patch('/addWishlist/:userId', userController.addWishlist)

module.exports = router