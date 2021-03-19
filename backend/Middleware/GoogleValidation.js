const config = require('../config/config.json');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.clientID);
const userController = require('../controllers/UserController');

async function verify(token, user) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.clientID,
    });
    const payload = ticket.getPayload();

    //adding user in db if he is not
    user = await userController.addUser(payload);
    console.log(user);
    return user;
}

module.exports = {
    verify,
};
