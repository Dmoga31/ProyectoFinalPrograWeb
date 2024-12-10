const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

class UserClass {
    // Obtener todos los usuarios
    static async getUsers() {
        try {
            return await User.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Obtener un usuario por ID
    static async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // En la clase UserClass, agrega este método:

static async getUserByEmail(Email) {
    try {
        return await User.findOne({ Email });
    } catch (error) {
        throw new Error(error.message);
    }
}

    // Crear un nuevo usuario
    static async createUser(data) {
        try {
            const { FirstName, LastName, Email, Password, IsAdmin } = data;
            const existingUser = await User.findOne({ Email });

            if (existingUser) {
                throw new Error('User already exists');
            }

            const user = new User({ FirstName, LastName, Email, Password, IsAdmin });
            return await user.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Actualizar un usuario
    static async updateUser(id, data) {
        try {

            if (data.Password) {
                const salt = await bcrypt.genSalt(10); // Generar el salt
                data.Password = await bcrypt.hash(data.Password, salt); // Hashear la contraseña
            }
            
            return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Eliminar un usuario
    static async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

     // Login de usuario
     static async loginUser(Email, Password) {
        try {
            // Verificar si el usuario existe
            const user = await User.findOne({ Email });
            if (!user) {
                throw new Error('User not found');
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(Password, user.Password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            // Generar el token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h', // El token expira en 1 hora
            });

            return {
                message: 'Login successful',
                token,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = UserClass;
