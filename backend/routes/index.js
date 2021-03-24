const express = require('express');
const router = express();
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');
const roleController = require('../controllers/RoleController');
const testController = require('../controllers/TestController');
const questionController = require('../controllers/QuestionController');
const JWTmiddleware = require('../Middleware/JWT');

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

//TEST
router.post('/test/data', testController.getTestData);
router.get(
    '/join-test',
    JWTmiddleware.authenticateToken,
    questionController.getNextQuestion
);
module.exports = router;
