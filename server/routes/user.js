const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.get('/:id', UserController.findOne);
router.post('/signin', UserController.signin);
router.post('/signinGoogle', UserController.googleSignin);
router.post('/signup', UserController.signup);
router.put('/:id', UserController.update)

module.exports = router