const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/:id', userController.findOne)
router.delete('/:id', userController.delete)

module.exports = router