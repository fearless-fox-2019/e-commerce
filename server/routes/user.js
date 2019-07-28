const router= require('express').Router()
const userController= require('../controllers/userController')
const authentication= require('../middlewares/authenticate')
const {authorizeAdmin}=require('../middlewares/authorize')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/', authentication, authorizeAdmin, userController.getAllUser)
router.patch('/:id', authentication, authorizeAdmin, userController.changeRole)

module.exports=router
