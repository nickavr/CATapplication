const User = require('../models').User;
const roleController = require('./RoleController');
// GET
const getAllUsers = async (req, res) => {
    try {
        await User.findAll().then(allUsers => {
            res.status(200).json(allUsers);
        });
    } catch (err) {
        res.status(404).send({
            message: 'No users found',
        });
    }
};

const getUserById = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('Resource not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const getUserByCredentials = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            console.log('user not found');
            res.status(200).json();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// POST addUser -> at login controller, after token is validated.
const addUser = async (req, res) => {
    let userRoles = [];
    try {
        let user = await User.findOrCreate({
            where: { email: req.body.email },
            defaults: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                estimated_ability: 0,
                email: req.body.email,
            },
        });
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
};

//PUT
const editUser = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({
                estimated_ability: req.body.estimated_ability,
            });

            res.status(200).send({
                message: 'User updated',
            });
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllUsers,
    getUserByCredentials,
    getUserById,
    addUser,
    editUser,
};
