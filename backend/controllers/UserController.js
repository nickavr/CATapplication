const User = require('../models').User;
const Role = require('../models').Role;
const roleController = require('./RoleController');
const TestArray = require('../storage/Test/TestArray');
//AUX
const getTokenFromArray = email => {
    let token = '';
    TestArray.testArray.forEach(test => {
        test.examinees.forEach(user => {
            if (user.email === email) {
                token = user.token;
                return token;
            }
        });
    });
    return token;
};
// GET
const getAllExaminees = async (req, res) => {
    try {
        let examineesArray = await User.findAll({
            attributes: ['id', 'email'],
            include: {
                model: Role,
                attributes: [],
                where: {
                    role_name: 'examinee',
                },
            },
        });
        res.status(200).json(examineesArray);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

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

const setUserToken = async (req, res) => {
    try {
        let email = req.query.email;
        let token = getTokenFromArray(email);

        res.status(200).json(token);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addUser = async userData => {
    let allRoles = await roleController.getAllRoles();

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
        let user = await User.findOne({ where: { email: userData.email } });

        if (!user) {
            user = await User.create({
                first_name: userData.given_name,
                last_name: userData.family_name,
                estimated_ability: 3,
                email: userData.email,
            });

            for (const role of userRoles) {
                await roleController.addUserToRole(
                    user.dataValues.id,
                    role.dataValues.id
                );
            }
        }

        try {
            user.dataValues['userRoles'] = userRoles;
        } catch (err) {
            console.log(err.message);
        }

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
    getAllExaminees,
    getAllUsers,
    getUserByCredentials,
    getUserById,
    setUserToken,
    addUser,
    editUser,
};
