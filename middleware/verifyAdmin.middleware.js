
const verifyAdmin = async (req, res, next) => {
    try {
        // Asegúrate de que el usuario esté definido en `req.user`
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User information is missing.' });
        }

        // Si el usuario ya tiene la propiedad `IsAdmin` cargada, úsala directamente
        if (req.user.IsAdmin !== undefined) {
            if (!req.user.IsAdmin) {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }
            return next();
        }

        // Si no tiene la propiedad `IsAdmin`, búscala en la base de datos
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!user.IsAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Todo está bien, pasa al siguiente middleware
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = verifyAdmin;