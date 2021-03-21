//Google auth
const GoogleValidation = require('../Middleware/GoogleValidation');

const loginAuth = async (req, res) => {
    try {
        let token = req.body.token;
        let user = await GoogleValidation.verify(token);

        if (user) {
            res.status(200).json(user.dataValues);
        } else {
            throw Error('User is null');
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    loginAuth,
};
