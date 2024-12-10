const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generar el token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // El token expira en 1 hora
        });

        console.log(token);
        // Devolver respuesta con el token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginUser };
