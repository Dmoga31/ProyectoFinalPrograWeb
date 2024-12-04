const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller.js'); // Importa el controlador de User

// Rutas para usuarios
router.post('/register', UserController.createUser); // Registro de usuario
router.post('/login', UserController.loginUser); // Login de usuario
router.get('/', UserController.getUsers); // Obtener todos los usuarios
router.get('/:id', UserController.getUserById); // Obtener usuario por ID
router.put('/:id', UserController.updateUser); // Actualizar usuario
router.delete('/:id', UserController.deleteUser); // Eliminar usuario

module.exports = router;
