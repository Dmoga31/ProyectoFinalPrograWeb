const express = require('express');
const router = express.Router();
const ConferenceController = require('../controllers/conference.controller'); // Importa el controlador de Conference
const verifyToken = require('../middleware/verifyToken.middleware.js'); // Importa el middleware de verifytoken
const verifyAdmin = require('../middleware/verifyAdmin.middleware.js'); // Importa el middleware de verifyAdmin

// Rutas para conferencias
router.post('/', verifyToken, ConferenceController.createConference); // Crear conferencia
router.get('/', verifyToken, ConferenceController.getConferences); // Obtener todas las conferencias
router.get('/:id', verifyToken, ConferenceController.getConferenceById); // Obtener conferencia por ID
router.put('/:id', verifyToken, ConferenceController.updateConference); // Actualizar conferencia
router.delete('/:id', verifyToken, ConferenceController.deleteConference); // Eliminar conferencia

module.exports = router;
