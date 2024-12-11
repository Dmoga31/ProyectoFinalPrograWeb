const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'JWT_SECRET is not defined' });
    }

    try {
        const decoded = jwt.verify(token, secret);

        if (!decoded._id) {
            return res.status(401).json({ message: 'Invalid token payload: Missing user identifier (_id)' });
        }

        // Cargar datos completos del usuario desde la base de datos
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Asignar la información del usuario al objeto `req.user`
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = verifyToken;