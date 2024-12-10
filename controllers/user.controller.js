const UserClass = require('../classes/User.js');

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserClass.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await UserClass.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const user = await UserClass.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await UserClass.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const user = await UserClass.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

// Método para login
static async loginUser(req, res) {
    const { Email, Password } = req.body;

    try {
        // Verificar si el usuario existe y verificar la contraseña
        const result = await UserClass.loginUser(Email, Password);

        // Si la autenticación es exitosa, devolver el token
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores si el login falla
        res.status(500).json({ message: error.message });
    }
}
}

module.exports = UserController;
