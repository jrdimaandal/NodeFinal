const { validate } = require('email-validator');
const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/user/:username', userController.getUserByUsername);
router.get('/user/email/:emailAddress', userController.getUserByEmailAddress);

router.delete('/user/:username',
                userController.validateUsernameDoesExists, 
                userController.deleteUser);

router.put('/user/:username', 
                userController.validateUsernameDoesExists,
                userController.validateBodyHasNoUsername,
                userController.validateEmailAlreadyExists,
                userController.validateEmail,
                userController.updateUser);

router.post('/',
                userController.validateEmail,
                userController.validateUsernameAlreadyExists,
                userController.validateEmailAlreadyExists,
                userController.insertUser);

module.exports = router;