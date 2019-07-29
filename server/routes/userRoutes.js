const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authorization} = require('../middlewares/middleware')



router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.loginGoogle)
router.delete('/:id',authorization.userDelete, UserController.delete)

module.exports = router