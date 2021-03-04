const express = require('express');
const router = express();
const userController = require('../controllers/UserController');

//LOGIN:
router.post('/login', async (req, res) => {
    try {
        let token = req.body.token;
        console.log(token);
        return res.status(200).send(token);
    } catch (err) {
        return res.status(500).send(err);
    }
});

//USER:
router.get('/users', userController.getAllUsers);
router.get('/users/credentials', userController.getUserByCredentials);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.post('/users', userController.addUser);

module.exports = router;
