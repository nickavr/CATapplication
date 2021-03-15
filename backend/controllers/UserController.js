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
const addUser = async userData => {
    let allRoles = await roleController.getAllRoles();
    // console.log(allRoles);

    let userRoles = [];
    if (userData.email.includes('stud')) {
        userRoles = allRoles.filter(role => {
            return role.dataValues.role_name.toString() === 'examinee';
        });
    } else {
        userRoles = allRoles.filter(role => {
            return role.dataValues.role_name.toString() !== 'examinee';
        });
    }

    try {
        let user = await User.findOrCreate({
            where: { email: userData.email },
            defaults: {
                first_name: userData.given_name,
                last_name: userData.family_name,
                estimated_ability: 0,
                email: userData.email,
            },
        });

        //TODO: modify if, in order to enter only if you added the user to db
        if (user) {
            for (const role of userRoles) {
                // console.log(user.id);
                await roleController.addUserToRole(
                    user[0].dataValues.id,
                    role.dataValues.id
                );
            }
        }

        user[0].dataValues['userRoles'] = userRoles;
        // console.log(user);

        return user;
    } catch (err) {
        return err.message;
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
