const { ControllerUser, ControllerProduct } = require('../controllers/index');
const routes = require('express').Router()
const { authentication , authorization } = require('../middlewares/auth');

routes.post('/signup', ControllerUser.signUp)
routes.post('/signin', ControllerUser.signIn)
routes.get('/all', ControllerUser.all)
routes.patch('/add/:id', authentication, ControllerUser.addToCart)
routes.patch('/remove/:id', authentication, ControllerUser.removeFromCart)

routes.get('/get', authentication, ControllerUser.getCart)

module.exports = routes
