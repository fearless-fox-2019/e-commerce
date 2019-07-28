const express = require('express');
const Router = express.Router();
const transactionController = require('../controllers/transactionCon')
const { Authentication, Authorization, AdminAuthorization, UserAuthorization } = require('../middlewares/auth')

Router.post('/', transactionController.create)
Router.use(Authentication)
Router.get('/all', AdminAuthorization, transactionController.list)
Router.get('/user/:userId', Authorization, transactionController.findbyUserId)
Router.get('/status/:status', Authorization, transactionController.findbyTransaction)
Router.patch('/update/status/:id', UserAuthorization, transactionController.updateStatus)
Router.patch('/update/product/:id', UserAuthorization, transactionController.updateProduct)
Router.delete('/:id', UserAuthorization, transactionController.delete)

module.exports = Router;