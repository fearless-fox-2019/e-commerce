const router = require('express').Router()
const User = require('../controllers/user')
// get all user /users
router.get('/', User.getAll)
// user register /users/register
router.post('/register', User.resgister)
// user login /users/login
router.post('/login', User.login)

module.exports = router