const express = require('express');
const router = express();
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');
const roleController = require('../controllers/RoleController');

//AUTH:
router.post('/login', loginController.loginAuth);

//USER:
router.get('/users/examinees', userController.getAllExaminees);
router.get('/users', userController.getAllUsers);
router.get('/users/credentials', userController.getUserByCredentials);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.post('/users', userController.addUser); //for testing

//ROLES
router.get('/roles', roleController.getAllRoles); //testing

module.exports = router;
