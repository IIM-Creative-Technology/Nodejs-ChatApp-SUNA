// const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// get password vars from .env file
// dotenv.config();
const SECRET = 'mykey'

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(id) {
    return jwt.sign({ id }, SECRET, { expiresIn: '1h' });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    SECRET
}