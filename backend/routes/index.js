const express = require('express');
const router = express();
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');
const roleController = require('../controllers/RoleController');
const currentTestController = require('../controllers/CurrentTestController');
const questionController = require('../controllers/QuestionController');
const JWTmiddleware = require('../Middleware/JWT');

//AUTH:
router.post('/login', loginController.loginAuth);

//USER:
router.get('/users/examinees', userController.getAllExaminees);
router.get('/users', userController.getAllUsers);
router.post('/user/token', userController.setUserToken);
router.get('/users/credentials', userController.getUserByCredentials);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.post('/users', userController.addUser); //for testing
router.get('/users/:id/test', questionController.getNextQuestion);

//ROLES
router.get('/roles', roleController.getAllRoles); //testing

//CURRENT TEST
router.post('/test/data', currentTestController.setTestData);
router.get('/test/join', JWTmiddleware.authenticateToken, (req, res) => {
    try {
        console.log('TOKEN AUTHENTIFICATED');
        //either res.send here or in jwt.verify NOT IN BOTH
        res.status(200).send({ text: 'MARVELOUS' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//QUESTIONS

module.exports = router;
