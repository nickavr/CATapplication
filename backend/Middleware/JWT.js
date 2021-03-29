const jwt = require('jsonwebtoken');

//sign token
function generateAccessToken(userEmail) {
    return jwt.sign({ email: userEmail }, process.env.TOKEN_SECRET, {
        expiresIn: '2h', // 2 hours
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send({
            message: 'No token provided!',
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: err.message,
            });
        }
        // res.status(200).json({
        //     decoded,
        // });

        next();
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken,
};
