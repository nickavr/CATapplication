//Google auth
const config = require('../config/config.json');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.clientID);
const User = require('../models').User;

const loginAuth = async (req, res) => {
    try {
        let token = req.body.token;
        let isAdmin = false;
        let user = null;
        console.log(token);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.clientID,
            });
            const payload = ticket.getPayload();
            isAdmin = payload['email'].includes('stud') ? false : true; //TODO: change valiation for isAdmin
            console.log(isAdmin);
            console.log(payload);

            //adding user in db if he is not
            user = await User.findOrCreate({
                where: { email: payload['email'] },
                defaults: {
                    first_name: payload['given_name'],
                    last_name: payload['family_name'],
                    estimated_ability: 0,
                    is_admin: isAdmin,
                    email: payload['email'],
                },
            });
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
