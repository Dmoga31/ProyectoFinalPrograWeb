const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const loginUser = async (req, res) => {
    const { Email, Password } = req.body;

     // Validar entrada
     if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verifica si JWT_SECRET está definido
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).json({ message: "JWT_SECRET is not defined" });
        }

        // Genera el token
        const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '1h' });

  // Responder con el token
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
        _id: user._id,
        Email: user.Email,
    }, // Información adicional del usuario, si es necesario
});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = loginUser;
