const router = require('express').Router()
// const StudentController = require('../controller/studentController')
const UserController = require('../controllers/userController.js')
router.post('/register',UserController.create)
router.post('/login',UserController.login)
module.exports = router
