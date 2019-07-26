const router= require('express').Router()
const userController= require('../controllers/userController')
const authentication= require('../middlewares/authenticate')
const {authorizeAdmin}=require('../middlewares/authorize')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.patch('/invite/:id', authentication, authorizeAdmin, userController.inviteToAdmin)

module.exports=router
