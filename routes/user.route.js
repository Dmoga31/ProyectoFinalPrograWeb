const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js'); // Importa el controlador de User
const verifyAdmin = require('../middleware/verifyAdmin.middleware.js'); // Importa el middleware de verifyAdmin
const verifyToken = require('../middleware/verifyToken.middleware.js'); // Importa el middleware de verifytoken


// Rutas para usuarios
router.post('/register', UserController.createUser); // Registro de usuario
router.post('/login', UserController.loginUser); // Login de usuario

router.get('/',verifyToken, verifyAdmin,  UserController.getUsers); // Obtener todos los usuarios
router.get('/:id',verifyToken, verifyAdmin,  UserController.getUserById); // Obtener usuario por ID
router.put('/:id',verifyToken, verifyAdmin,  UserController.updateUser); // Actualizar usuario
router.delete('/:id',verifyToken, verifyAdmin,  UserController.deleteUser); // Eliminar usuario

module.exports = router;
