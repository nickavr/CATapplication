const express = require('express');
const router = express();
const userController = require('../controllers/UserController');

//USER:
router.get('/users', userController.getAllUsers);
router.get('/users/credentials', userController.getUserByCredentials);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.post('users/:id', userController.addUser);