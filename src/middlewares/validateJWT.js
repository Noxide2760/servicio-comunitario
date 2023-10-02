const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const validateJWT = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) res.status(401).json(response({
        status: 'ERROR',
        msg: 'Full authentication is required'
    }));
    
    try {
        const verified = jwt.verify(token, 'secret');
        next()
    } catch (error) {
        res.status(401).json(response({
            status: 'ERROR',
            msg: 'Full authentication is required'
        }));
    }

}

module.exports = validateJWT;