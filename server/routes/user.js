const userRouter = require('express').Router(),
    userController = require('../controllers/user')

userRouter.post('/signin/google', userController.googleSignIn)
userRouter.post('/signin', userController.signIn)
userRouter.post('/signup', userController.signUp)

module.exports = userRouter