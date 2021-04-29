const express = require('express');
const router = express();
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');
const roleController = require('../controllers/RoleController');
const currentTestController = require('../controllers/CurrentTestController');
const questionController = require('../controllers/QuestionController');
const catDataController = require('../controllers/CatDataController');
const JWTmiddleware = require('../Middleware/JWT');
const { CurrentTest } = require('../models');

//AUTH:
router.post('/login', loginController.loginAuth);

//USER:
router.get('/users/examinees', userController.getAllExaminees);
router.get('/users', userController.getAllUsers);
router.post('/user/token', userController.setUserToken);
router.get('/users/credentials', userController.getUserByCredentials);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.get('/users/:id/token', userController.checkUserToken);
router.post('/users', userController.addUser); //for testing
router.get('/users/:id/questions', questionController.getAnsweredQuestions);

//ROLES
router.get('/roles', roleController.getAllRoles); //testing

//CURRENT TEST
router.post('/test/data', currentTestController.setTestData);
router.post('/test/stop', currentTestController.examinerStopTest);
router.post('/test/finished/:id', currentTestController.examineeFinishesTest);
router.get('/test/users/:id', currentTestController.getTestData);
router.get(
    '/test/examiners/:email',
    currentTestController.checkCurrentTestData
);
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
router.get(
    '/users/:id/questions/:ability/:stdError/:noQuestions',
    questionController.getNextQuestion
);
router.post('/user-answers', questionController.addUserAnswer);

//CAT-DATA
router.post('/cat-data', catDataController.setCatData);

module.exports = router;
