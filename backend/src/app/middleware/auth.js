const Users = require('../model/user');
const { decodeToken } = require('../utils/token');

Roles = {
    ADMIN: 'Admin',
    USER: 'User'
};

const authMW = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const decodedToken = decodeToken(token);

        const user = await Users.findOne({ where: { id: decodedToken.id, role: decodedToken.role } });
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = {
    authMW,
    Roles
};
