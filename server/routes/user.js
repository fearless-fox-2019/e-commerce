const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userCon')
const { Authentication } = require('../middlewares/auth')

Router.post('/signup', userController.signUp)
Router.post('/signin', userController.signIn)
Router.use(Authentication)
Router.get('/user', userController.findUser)
Router.patch('/updatebalance', userController.editBalance)

module.exports = Router;