const express = require('express');
const router = express();
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');

//AUTH:
router.post('/login', loginController.loginAuth);

//USER:
router.get('/users', userController.getAllUsers);
router.get('/users/credentials', userController.getUserByCredentials);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.post('/users', userController.addUser); //for testing

module.exports = router;
