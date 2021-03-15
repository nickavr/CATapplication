const Role = require('../models').Role;
const User = require('../models').User;
//GET
const getAllRoles = async () => {
    try {
        let roles = await Role.findAll();
        return roles;
    } catch (err) {
        return err.message;
    }
};

//POST add user to role
const addUserToRole = async (userId, roleId) => {
    return await Role.findByPk(roleId)
        .then(role => {
            if (!role) {
                console.log('Role not found!');
                return null;
            }
            return User.findByPk(userId).then(user => {
                if (!user) {
                    console.log('User not found!');
                    return null;
                }

                role.addUser(user);
                return role;
            });
        })
        .catch(err => {
            console.log(err.message);
        });
};

module.exports = {
    getAllRoles,
    addUserToRole,
};
