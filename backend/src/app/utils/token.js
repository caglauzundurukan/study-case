const jwt = require('jsonwebtoken');

const createToken = (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createToken, decodeToken };
