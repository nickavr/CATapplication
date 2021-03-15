//Google auth
const config = require('../config/config.json');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.clientID);
const User = require('../models').User;
const userController = require('./UserController');
const roleController = require('./RoleController');

const loginAuth = async (req, res) => {
    try {
        let token = req.body.token;
        let user = null;

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.clientID,
            });
            const payload = ticket.getPayload();

            //adding user in db if he is not
            user = await userController.addUser(payload);
            // console.log(user);
        }
        verify()
            .then(() => {
                res.status(200).json(user);
            })
            .catch(err => res.redirect('/'));
    } catch (err) {
        return res.status(500).send(err);
    }
};

module.exports = {
    loginAuth,
};
