const Role = require('../models').Role;

//GET all roles:
const getAllRoles = async (req, res) => {
    try {
        let roles = await Role.findAll();
        return res.status(200).send(roles);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    getAllRoles,
};
