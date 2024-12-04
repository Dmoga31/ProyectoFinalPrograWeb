const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    // Extraer el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Obtiene el token después de "Bearer"
    console.log(token)
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verificar que la clave secreta esté definida
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'JWT_SECRET is not defined' });
    }

    try {
        // Decodificar y verificar el token
        const decoded = jwt.verify(token, secret);

        // Validar que el token contenga el campo `_id`
        if (!decoded._id) {
            return res.status(401).json({ message: 'Invalid token payload: Missing user identifier (_id)' });
        }

        // Asignar la información del usuario al objeto `req.user`
        req.user = decoded;

        // Continuar con la siguiente función de middleware
        next();
    } catch (error) {
        // Manejar errores de verificación de token
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = verifyToken;
